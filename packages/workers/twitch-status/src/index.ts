import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';

import type { TwitchEvent, TwitchEventStreamOnline } from "./types/twitch/events";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	FD_CONTENT_STATUS: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

const HMAC_PREFIX = 'sha256=';
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();

const HEADERS_GET = {
	'content-type': 'application/json;charset=UTF-8',

	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type'
}

const SUBSCRIPTIONS = ['stream.online', 'stream.offline'];

const getHmacPrecursor = (headers: Request['headers'], body: string): string => {
	const id = headers.get(TWITCH_MESSAGE_ID) ?? '';
	const timestamp = headers.get(TWITCH_MESSAGE_TIMESTAMP) ?? '';
	return (id + timestamp + body);
}

const makeHmac = (secret: string, message: string) => {
    return crypto.createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}

const verifyMessage = (ours: string, theirs: string): boolean => {
	return crypto.subtle.timingSafeEqual(Buffer.from(ours), Buffer.from(theirs));
}

const compareHmac = (headers: Request['headers'], body: string): boolean => {
	const secret = 'testtesttest'; // TODO: Use secret stored in KV
	const precursor = getHmacPrecursor(headers, body);

	const ours = HMAC_PREFIX + makeHmac(secret, precursor);
	const theirs = headers.get(TWITCH_MESSAGE_SIGNATURE);

	if (theirs === null) {
		return false;
	}

	return verifyMessage(ours, theirs);
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		async function handleIngest(data: TwitchEvent): Promise<boolean> {
			if (!(SUBSCRIPTIONS.includes(data.subscription.type))) { return true; }

			if ("stream.online" === data.subscription.type) {
				if (['playlist', 'rerun'].includes((data as TwitchEventStreamOnline).event.type)) { return true;}

				await env.FD_CONTENT_STATUS.put("twitch", JSON.stringify({
					live: true,
					started_at: (data as TwitchEventStreamOnline).event.started_at
				}))
			}

			if ("stream.offline" === data.subscription.type) {
				await env.FD_CONTENT_STATUS.put("twitch", JSON.stringify({
					live: false,
					started_at: ''
				}))
			}

			return true;
		}

		try {
			if (request.method.toUpperCase() === 'GET') {
				const value = await env.FD_CONTENT_STATUS.get('twitch');

				if (value === null) {
					return new Response(JSON.stringify({
						live: false,
						started_at: '',
					}), { headers: HEADERS_GET })
				}

				return new Response(value, { headers: HEADERS_GET })
			}

			if (request.method.toUpperCase() === 'POST') {
				const body = JSON.stringify(await request.json());
				if (!compareHmac(request.headers, body)) { return new Response('', { status: 403 })}

				const data: TwitchEvent = JSON.parse(body);

				if (data.subscription.status === 'webhook_callback_verification_pending') {
					return new Response((data as TwitchEvent & { challenge: string }).challenge);
				}

				await handleIngest(data);
				return new Response('');
			}

			return new Response('', { status: 405 });
		} catch (error) {
			console.error(error);
			return new Response('', { status: 500 });
		}
	}
};

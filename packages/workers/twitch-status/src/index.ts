import { TwitchEvent, TwitchEventStreamOnline } from "./types/twitch/events";

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

const HEADERS_GET = {
	'content-type': 'application/json;charset=UTF-8',

	'Access-Control-Allow-Credentials': 'true',
	'Access-Control-Allow-Methods': 'GET',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type'
}

const SUBSCRIPTIONS = ['stream.online', 'stream.offline'];

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		async function handlePost(data: TwitchEvent): Promise<boolean> {
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
			const data: TwitchEvent = JSON.parse(await request.text());

			if (data.subscription.status === 'webhook_callback_verification_pending') {
				return new Response((data as TwitchEvent & { challenge: string }).challenge);
			}

			await handlePost(data);
			return new Response('');
		}

		return new Response('', { status: 405 });
	}
};

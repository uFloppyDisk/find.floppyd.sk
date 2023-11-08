/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

type TwitchEventSubStatusEnabled = {
	status: 'enabled'
}

type TwitchEventSubStatusVerification = {
	status: 'webhook_callback_verification_pending'
}

type TwitchEventSubBody = {
	id: string,
	version: string,
	condition: { broadcaster_user_id: string },
	transport: { method: 'webhook', callback: string },
	created_at: string,
	cost: number
} & TwitchEventSubStatusEnabled | TwitchEventSubStatusVerification;

type TwitchEventStreamOnline = {
	subscription: TwitchEventSubBody & {
		type: 'stream.online',
	},
	event: {
		id: string,
		broadcaster_user_id: string,
		broadcaster_user_login: string,
		broadcaster_user_name: string,
		type: 'live' | 'playlist' | 'watch_party' | 'premiere' | 'rerun',
		started_at: string
	}
}

type TwitchEventStreamOffline = {
	subscription: TwitchEventSubBody & {
		type: 'stream.offline',
	},
	event: {
		broadcaster_user_id: string,
		broadcaster_user_login: string,
		broadcaster_user_name: string
	}
}

type TwitchEvent = TwitchEventStreamOnline | TwitchEventStreamOffline;

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

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const SUBSCRIPTIONS = ['stream.online', 'stream.offline'];

		if (!(request.method.toUpperCase() === 'POST')) { return new Response(''); }
		
		const data: TwitchEvent = JSON.parse(await request.text());
		if (data.subscription.status === 'webhook_callback_verification_pending') {
			return new Response((data as TwitchEvent & { challenge: string }).challenge);
		}

		if (!(SUBSCRIPTIONS.includes(data.subscription.type))) { return new Response(''); }

		switch (data.subscription.type) {
			case "stream.online":
				if (['playlist', 'rerun'].includes((data as TwitchEventStreamOnline).event.type)) { break;}

				await env.FD_CONTENT_STATUS.put("twitch", JSON.stringify({
					live: true,
					started_at: (data as TwitchEventStreamOnline).event.started_at
				}))

				break;

			case "stream.offline":
				await env.FD_CONTENT_STATUS.put("twitch", JSON.stringify({
					live: false,
					started_at: ''
				}))

				break;
		
			default:
				break;
		}

		return new Response('');
	},
};

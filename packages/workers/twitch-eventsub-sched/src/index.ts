import crypto from 'node:crypto';

export interface Env {
	FD_CONTENT_SECRETS: KVNamespace;
}

const KV_SECRET_WEBHOOK = "twitch-webhook-secret";

const URI_TWITCH_EVENTSUB = 'https://api.twitch.tv/helix/eventsub/subscriptions'
const HEADERS_SUBSCRIBE = {
	'Content-Type': 'application/json'
}

const TWITCH_USER_ID = 37705020;
const SUBSCRIPTIONS = [
	{
		type: "stream.online",
		condition: {
			"broadcaster_user_id": TWITCH_USER_ID
		}
	},
	{
		type: "stream.offline",
		condition: {
			"broadcaster_user_id": TWITCH_USER_ID
		}
	}
]

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log(`Ran at ${event.scheduledTime}`);

		let secret = await env.FD_CONTENT_SECRETS.get(KV_SECRET_WEBHOOK) ?? '';
		if (secret == '') { 
			secret = crypto.randomBytes(32).toString();
			await env.FD_CONTENT_SECRETS.put(KV_SECRET_WEBHOOK, secret)
		}

		for (const sub of SUBSCRIPTIONS) {
			const body = {
				"version": "2",
				"type": sub.type,
				"condition": sub.condition,
				"transport": {
					"method": "webhook",
					"callback": env.API_WEBHOOK_CALLBACK,
					"secret": secret
				}
			}

			const response = await fetch(
				URI_TWITCH_EVENTSUB,
				{
					headers: HEADERS_SUBSCRIBE,
					body: JSON.stringify(body)
				}
			)

			console.log(response);
		}
	},
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response('', { status: 404 });
	}
};

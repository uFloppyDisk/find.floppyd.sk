import crypto from 'node:crypto';

export interface Env {
	FD_CONTENT_SECRETS: KVNamespace;

	API_WEBHOOK_CALLBACK: string | undefined;
}

const KV_SECRET_CLIENT_ID = "twitch-client-id";
const KV_SECRET_APPTOKEN = "twitch-app-token";
const KV_SECRET_WEBHOOK = "twitch-webhook-secret";

const URI_TWITCH_EVENTSUB = 'https://api.twitch.tv/helix/eventsub/subscriptions'

const TWITCH_USER_ID = "37705020";
const SUBSCRIPTIONS = [
	{
		type: "stream.online",
		version: "1",
		condition: {
			broadcaster_user_id: TWITCH_USER_ID
		}
	},
	//{
	// 	type: "stream.offline",
	// 	version: "1",
	//	condition: {
	//		"broadcaster_user_id": TWITCH_USER_ID
	//	}
	//}
]

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log(`Ran at ${event.scheduledTime}`);

		const APP_TOKEN = await env.FD_CONTENT_SECRETS.get(KV_SECRET_APPTOKEN);
		if (APP_TOKEN === null) {
			console.log("Twitch app token could not be found.");
			return;
		}

		const CLIENT_ID = await env.FD_CONTENT_SECRETS.get(KV_SECRET_CLIENT_ID);
		if (CLIENT_ID === null) {
			console.log("Twitch client ID could not be found.");
			return;
		}

		let secret = await env.FD_CONTENT_SECRETS.get(KV_SECRET_WEBHOOK) ?? '';
		if (secret == '') {
			secret = crypto.randomBytes(32).toString();
			await env.FD_CONTENT_SECRETS.put(KV_SECRET_WEBHOOK, secret)
		}

		for (const sub of SUBSCRIPTIONS) {
			const body = {
				"version": sub.version,
				"type": sub.type,
				"condition": sub.condition,
				"transport": {
					"method": "webhook",
					"callback": env.API_WEBHOOK_CALLBACK,
					"secret": secret
				}
			}

			try {
				const response = await fetch(
					URI_TWITCH_EVENTSUB,
					{
						method: "POST",
						headers: {
							"Authorization": `Bearer ${APP_TOKEN}`,
							"Client-Id": CLIENT_ID,

							"Content-Type": "application/json",
						},
						body: JSON.stringify(body)
					}
				);

				const response_body = await response.json();
				console.log(response.status, response_body);
			} catch (e) {
				console.error(e);
			}
		}
	},
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(null, { status: 404 });
	}
};

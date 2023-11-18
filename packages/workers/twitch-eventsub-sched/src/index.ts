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
	{
	 	type: "stream.offline",
	 	version: "1",
		condition: {
			"broadcaster_user_id": TWITCH_USER_ID
		}
	}
]

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
		async function checkSubscriptions(id: string, token:string): Promise<typeof SUBSCRIPTIONS> {
			const response = await fetch(URI_TWITCH_EVENTSUB, {
				headers: {
					"Authorization": `Bearer ${token}`,
					"Client-Id": id,
				}
			});

			if (response.status !== 200) { return []; }

			let needed = SUBSCRIPTIONS;

			const body: typeof Response.json & { data: any } = await response.json();
			for (const sub of body.data) {
				if (["enabled", "webhook_callback_verification_pending"].includes(sub.status)) {
					needed = needed.filter((x) => !(x.type === sub.type));
				}
			}

			return needed;
		}

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

		const subscriptions_needed = await checkSubscriptions(CLIENT_ID, APP_TOKEN);
		if (subscriptions_needed.length <= 0) { return; }

		let secret = await env.FD_CONTENT_SECRETS.get(KV_SECRET_WEBHOOK) ?? '';
		if (secret == '') {
			secret = crypto.randomBytes(32).toString();
			await env.FD_CONTENT_SECRETS.put(KV_SECRET_WEBHOOK, secret)
		}

		try {
			for (const sub of subscriptions_needed) {
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
			}
		} catch (e) {
			console.error(e);
		}
	},
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(null, { status: 404 });
	}
};

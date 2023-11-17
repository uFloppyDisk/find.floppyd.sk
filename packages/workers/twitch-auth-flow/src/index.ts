export interface Env {
	FD_CONTENT_SECRETS: KVNamespace;
}

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
		console.log(`Ran at ${event.cron}`);

		for (const sub of SUBSCRIPTIONS) {
			const body = {
				"version": "2",
				"type": sub.type,
				"condition": sub.condition,
			}

			await fetch(
				URI_TWITCH_EVENTSUB,
				{
					headers: HEADERS_SUBSCRIBE,
					body: JSON.stringify(body)
				}
			)
		}
	},
};

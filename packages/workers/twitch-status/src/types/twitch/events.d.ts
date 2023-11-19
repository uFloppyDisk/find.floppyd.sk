export type TwitchEventSubStatusEnabled = {
	status: 'enabled'
}

export type TwitchEventSubStatusVerification = {
	status: 'webhook_callback_verification_pending'
}

export type TwitchEventSubBody = TwitchEventSubStatusEnabled | TwitchEventSubStatusVerification & {
	id: string,
	version: string,
	condition: { broadcaster_user_id: string },
	transport: { method: 'webhook', callback: string },
	created_at: string,
	cost: number
};

export type TwitchEventStreamOnline = {
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

export type TwitchEventStreamOffline = {
	subscription: TwitchEventSubBody & {
		type: 'stream.offline',
	},
	event: {
		broadcaster_user_id: string,
		broadcaster_user_login: string,
		broadcaster_user_name: string
	}
}

export type TwitchEvent = TwitchEventStreamOnline | TwitchEventStreamOffline;


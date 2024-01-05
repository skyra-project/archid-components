/**
 * Represents the types of forbidden content.
 */
export enum ForbiddenType {
	Quarantined,
	Gated
}

/**
 * Represents the type of flair.
 */
export enum FlairType {
	Richtext = 'richtext',
	Text = 'text'
}

/**
 * Represents the text color options for a flair.
 */
export enum FlairTextColor {
	Dark = 'dark'
}

/**
 * Represents the status of transcoding.
 */
export enum TranscodingStatus {
	Completed = 'completed'
}

/**
 * Represents the whitelist status for ads on Reddit.
 */
export enum WhitelistStatus {
	AllAds = 'all_ads'
}

/**
 * Enum representing the different types of post hints.
 */
export enum PostHint {
	/**
	 * Post hint for a hosted video.
	 */
	HostedVideo = 'hosted:video',

	/**
	 * Post hint for an image.
	 */
	Image = 'image',

	/**
	 * Post hint for a rich video.
	 */
	RichVideo = 'rich:video'
}

/**
 * Represents the type of a subreddit.
 */
export enum SubredditType {
	Public = 'public',
	Restricted = 'restricted'
}

/**
 * Represents the different kinds of entities in Reddit.
 */
export enum Kind {
	Post = 't3',
	Reddit = 't5'
}

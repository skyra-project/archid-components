import type { FlairTextColor, FlairType, Kind, PostHint, SubredditType, TranscodingStatus, WhitelistStatus } from './enums.js';

/**
 * Represents a cache hit, containing information about whether the cache has NSFW or NSFL content,
 * as well as an array of cache entries.
 */
export interface CacheHit {
	/**
	 * Indicates whether the cache contains NSFL (Not Safe for Life) content.
	 */
	readonly hasNsfl: boolean;
	/**
	 * Indicates whether the cache contains NSFW (Not Safe for Work) content.
	 */
	readonly hasNsfw: boolean;
	/**
	 * An array of cache entries.
	 */
	readonly posts: readonly CacheEntry[];
}

/**
 * Represents a cache entry.
 */
export interface CacheEntry {
	/**
	 * The author of the entry.
	 */
	readonly author: string;
	/**
	 * Indicates whether the entry is NSFW (Not Safe for Work).
	 */
	readonly nsfw: boolean;
	/**
	 * The title of the entry.
	 */
	readonly title: string;
	/**
	 * The URL of the entry.
	 */
	readonly url: string;
}

/**
 * Represents an error response from the Reddit API.
 */
export type RedditError =
	| RedditNotFound
	| RedditBanned
	| RedditForbidden
	| RedditGoldOnly
	| RedditQuarantined
	| RedditGated
	| RedditUnavailableForLegalReasons
	| RedditServerError;

/**
 * Represents a forbidden response from the Reddit API.
 */
export interface RedditForbidden {
	/**
	 * The error code.
	 */
	error: 403;
	/**
	 * The error message.
	 */
	message: 'Forbidden';
	/**
	 * The reason for the forbidden response.
	 */
	reason: 'private';
}

/**
 * Represents a Reddit API response when a resource is only available to Reddit Gold users.
 */
export interface RedditGoldOnly {
	/**
	 * The HTTP status code for the error response.
	 */
	error: 403;
	/**
	 * The error message returned when accessing the resource without Reddit Gold.
	 */
	message: 'Forbidden';
	/**
	 * The reason why the resource is only available to Reddit Gold users.
	 */
	reason: 'gold_only';
}

/**
 * Represents a quarantined Reddit post or comment.
 */
export interface RedditQuarantined {
	/**
	 * The error code.
	 */
	error: 403;
	/**
	 * The error message.
	 */
	message: 'Forbidden';
	/**
	 * The plain text message explaining the quarantine.
	 */
	quarantine_message: string;
	/**
	 * The HTML message explaining the quarantine.
	 */
	quarantine_message_html: string;
	/**
	 * The reason for the quarantine.
	 */
	reason: 'quarantined';
}

/**
 * Represents a RedditGated object.
 */
export interface RedditGated {
	/**
	 * The error code.
	 */
	error: 403;
	/**
	 * The plain text message to display as an interstitial warning.
	 */
	interstitial_warning_message: string;
	/**
	 * The HTML message to display as an interstitial warning.
	 */
	interstitial_warning_message_html: string;
	/**
	 * The error message.
	 */
	message: 'Forbidden';
	/**
	 * The reason for the gating.
	 */
	reason: 'gated';
}

/**
 * Represents a Reddit not found error.
 */
export interface RedditNotFound {
	error: 404;
	message: 'Not Found';
}

/**
 * Represents a banned Reddit user.
 */
export interface RedditBanned {
	error: 404;
	message: 'Not Found';
	reason: 'banned';
}

/**
 * Represents a Reddit response indicating that the resource is unavailable for legal reasons.
 */
export interface RedditUnavailableForLegalReasons {
	error: 451;
	message: 'Unavailable';
}

/**
 * Represents a Reddit server error.
 */
export interface RedditServerError {
	error: 500;
	message: 'Internal Server Error';
}

/**
 * Represents a response from the Reddit API.
 */
export interface RedditResponse {
	data: RedditResponseData;
	kind: string;
}

/**
 * Represents the response data from a Reddit API request.
 */
export interface RedditResponseData {
	after: string;
	before: null;
	children: Child[];
	dist: number;
	geo_filter: null;
	modhash: string;
}

/**
 * Represents a child element.
 */
export interface Child {
	data: ChildData;
	kind: Kind;
}

/**
 * Represents the data of a child in a Reddit post.
 */
export interface ChildData {
	/**
	 * An array of all the awards received by the child.
	 */
	all_awardings: AllAwarding[];
	/**
	 * Indicates whether live comments are allowed for the child.
	 */
	allow_live_comments: boolean;
	/**
	 * The UTC timestamp when the child was approved.
	 */
	approved_at_utc: null;
	/**
	 * The user who approved the child.
	 */
	approved_by: null;
	/**
	 * Indicates whether the child is archived.
	 */
	archived: boolean;
	/**
	 * The username of the author.
	 */
	author: string;
	/**
	 * The background color of the author's flair.
	 */
	author_flair_background_color: null;
	/**
	 * The CSS class of the author's flair.
	 */
	author_flair_css_class: null;
	/**
	 * An array of richtext objects representing the author's flair.
	 */
	author_flair_richtext: FlairRichtext[];
	/**
	 * The ID of the template used for the author's flair.
	 */
	author_flair_template_id: null | string;
	/**
	 * The text of the author's flair.
	 */
	author_flair_text: null | string;
	/**
	 * The text color of the author's flair.
	 */
	author_flair_text_color: FlairTextColor | null;
	/**
	 * The type of the author's flair.
	 */
	author_flair_type: FlairType;
	/**
	 * The fullname of the author.
	 */
	author_fullname: string;
	/**
	 * Indicates whether the author is blocked.
	 */
	author_is_blocked: boolean;
	/**
	 * Indicates whether the author has a Patreon flair.
	 */
	author_patreon_flair: boolean;
	/**
	 * Indicates whether the author has a premium account.
	 */
	author_premium: boolean;
	/**
	 * An array of unknown objects representing the awarders.
	 */
	awarders: unknown[];
	/**
	 * The UTC timestamp when the child was banned.
	 */
	banned_at_utc: null;
	/**
	 * The user who banned the child.
	 */
	banned_by: null;
	/**
	 * Indicates whether the child can be gilded.
	 */
	can_gild: boolean;
	/**
	 * Indicates whether the child can be moderated.
	 */
	can_mod_post: boolean;
	/**
	 * The category of the child.
	 */
	category: null;
	/**
	 * Indicates whether the child has been clicked.
	 */
	clicked: boolean;
	/**
	 * The content categories of the child.
	 */
	content_categories: null;
	/**
	 * Indicates whether the child is in contest mode.
	 */
	contest_mode: boolean;
	/**
	 * The timestamp when the child was created.
	 */
	created: number;
	/**
	 * The UTC timestamp when the child was created.
	 */
	created_utc: number;
	/**
	 * The type of discussion for the child.
	 */
	discussion_type: null;
	/**
	 * The distinguished status of the child.
	 */
	distinguished: null;
	/**
	 * The domain of the child.
	 */
	domain: string;
	/**
	 * The number of downvotes for the child.
	 */
	downs: number;
	/**
	 * Indicates whether the child has been edited.
	 */
	edited: boolean;
	/**
	 * The number of awards received by the child.
	 */
	gilded: number;
	/**
	 * The gildings received by the child.
	 */
	gildings: Gildings;
	/**
	 * Indicates whether the child is hidden.
	 */
	hidden: boolean;
	/**
	 * Indicates whether the child's score is hidden.
	 */
	hide_score: boolean;
	/**
	 * The ID of the child.
	 */
	id: string;
	/**
	 * Indicates whether the child was created from the ads UI.
	 */
	is_created_from_ads_ui: boolean;
	/**
	 * Indicates whether the child can be crossposted.
	 */
	is_crosspostable: boolean;
	/**
	 * Indicates whether the child is a meta post.
	 */
	is_meta: boolean;
	/**
	 * Indicates whether the child is original content.
	 */
	is_original_content: boolean;
	/**
	 * Indicates whether the child is from the Reddit media domain.
	 */
	is_reddit_media_domain: boolean;
	/**
	 * Indicates whether the child is indexable by robots.
	 */
	is_robot_indexable: boolean;
	/**
	 * Indicates whether the child is a self post.
	 */
	is_self: boolean;
	/**
	 * Indicates whether the child is a video post.
	 */
	is_video: boolean;
	/**
	 * The user's like status for the child.
	 */
	likes: null;
	/**
	 * The background color of the link flair.
	 */
	link_flair_background_color: string;
	/**
	 * The CSS class of the link flair.
	 */
	link_flair_css_class: null;
	/**
	 * An array of richtext objects representing the link flair.
	 */
	link_flair_richtext: FlairRichtext[];
	/**
	 * The text of the link flair.
	 */
	link_flair_text: null;
	/**
	 * The text color of the link flair.
	 */
	link_flair_text_color: FlairTextColor;
	/**
	 * The type of the link flair.
	 */
	link_flair_type: FlairType;
	/**
	 * Indicates whether the child is locked.
	 */
	locked: boolean;
	/**
	 * The media object associated with the child.
	 */
	media: Media | null;
	/**
	 * The media embed object associated with the child.
	 */
	media_embed: MediaEmbed;
	/**
	 * Indicates whether the child contains only media.
	 */
	media_only: boolean;
	/**
	 * The moderator's note for the child.
	 */
	mod_note: null;
	/**
	 * The user who provided the moderation reason for the child.
	 */
	mod_reason_by: null;
	/**
	 * The title of the moderation reason for the child.
	 */
	mod_reason_title: null;
	/**
	 * An array of unknown objects representing the mod reports.
	 */
	mod_reports: unknown[];
	/**
	 * The name of the child.
	 */
	name: string;
	/**
	 * Indicates whether the child has the "no follow" attribute.
	 */
	no_follow: boolean;
	/**
	 * The number of comments on the child.
	 */
	num_comments: number;
	/**
	 * The number of crossposts of the child.
	 */
	num_crossposts: number;
	/**
	 * The number of reports on the child.
	 */
	num_reports: null;
	/**
	 * Indicates whether the child is marked as NSFW.
	 */
	over_18: boolean;
	/**
	 * The whitelist status of the parent subreddit.
	 */
	parent_whitelist_status: WhitelistStatus | null;
	/**
	 * The permalink of the child.
	 */
	permalink: string;
	/**
	 * Indicates whether the child is pinned.
	 */
	pinned: boolean;
	/**
	 * The hint for the type of post.
	 */
	post_hint: PostHint;
	/**
	 * The preview object associated with the child.
	 */
	preview: Preview;
	/**
	 * The number of reports required to remove the child.
	 */
	pwls: number | null;
	/**
	 * Indicates whether the child is in quarantine.
	 */
	quarantine: boolean;
	/**
	 * The reason for removing the child.
	 */
	removal_reason: null;
	/**
	 * The user who removed the child.
	 */
	removed_by: null;
	/**
	 * The category of removal for the child.
	 */
	removed_by_category: string | null;
	/**
	 * The reasons for reporting the child.
	 */
	report_reasons: null;
	/**
	 * Indicates whether the child is saved.
	 */
	saved: boolean;
	/**
	 * The score of the child.
	 */
	score: number;
	/**
	 * The media object associated with the child (secure version).
	 */
	secure_media: Media | null;
	/**
	 * The media embed object associated with the child (secure version).
	 */
	secure_media_embed: MediaEmbed;
	/**
	 * The selftext of the child.
	 */
	selftext: string;
	/**
	 * The HTML representation of the selftext.
	 */
	selftext_html: null;
	/**
	 * Indicates whether replies should be sent to the user.
	 */
	send_replies: boolean;
	/**
	 * Indicates whether the child is a spoiler.
	 */
	spoiler: boolean;
	/**
	 * Indicates whether the child is stickied.
	 */
	stickied: boolean;
	/**
	 * The subreddit where the child is posted.
	 */
	subreddit: string;
	/**
	 * The ID of the subreddit where the child is posted.
	 */
	subreddit_id: string;
	/**
	 * The prefixed name of the subreddit where the child is posted.
	 */
	subreddit_name_prefixed: string;
	/**
	 * The number of subscribers of the subreddit where the child is posted.
	 */
	subreddit_subscribers: number;
	/**
	 * The type of the subreddit where the child is posted.
	 */
	subreddit_type: SubredditType;
	/**
	 * The suggested sort for the child.
	 */
	suggested_sort: null;
	/**
	 * The thumbnail URL of the child.
	 */
	thumbnail: string;
	/**
	 * The height of the thumbnail image.
	 */
	thumbnail_height: number;
	/**
	 * The width of the thumbnail image.
	 */
	thumbnail_width: number;
	/**
	 * The title of the child.
	 */
	title: string;
	/**
	 * The type of the top awarded item.
	 */
	top_awarded_type: null;
	/**
	 * The total number of awards received by the child.
	 */
	total_awards_received: number;
	/**
	 * An array of unknown objects representing the treatment tags.
	 */
	treatment_tags: unknown[];
	/**
	 * The number of upvotes for the child.
	 */
	ups: number;
	/**
	 * The upvote ratio of the child.
	 */
	upvote_ratio: number;
	/**
	 * The URL of the child.
	 */
	url: string;
	/**
	 * The overridden URL of the child.
	 */
	url_overridden_by_dest: string;
	/**
	 * An array of unknown objects representing the user reports.
	 */
	user_reports: unknown[];
	/**
	 * The view count of the child.
	 */
	view_count: null;
	/**
	 * Indicates whether the child has been visited.
	 */
	visited: boolean;
	/**
	 * The whitelist status of the child.
	 */
	whitelist_status: WhitelistStatus | null;
	/**
	 * The whitelist status of the child.
	 */
	wls: number;
}

/**
 * Represents an award object.
 */
export interface AllAwarding {
	/**
	 * The sub type of the award.
	 */
	award_sub_type: string;
	/**
	 * The type of the award.
	 */
	award_type: string;
	/**
	 * The number of awardings required to grant benefits.
	 */
	awardings_required_to_grant_benefits: null;
	/**
	 * The price of the award in coins.
	 */
	coin_price: number;
	/**
	 * The number of coins rewarded for the award.
	 */
	coin_reward: number;
	/**
	 * The count of the award.
	 */
	count: number;
	/**
	 * The number of days the award extends the drip benefits.
	 */
	days_of_drip_extension: null;
	/**
	 * The number of days of premium membership granted by the award.
	 */
	days_of_premium: number | null;
	/**
	 * The description of the award.
	 */
	description: string;
	/**
	 * The end date of the award.
	 */
	end_date: null;
	/**
	 * The number of coins rewarded to the giver of the award.
	 */
	giver_coin_reward: null;
	/**
	 * The format of the award icon.
	 */
	icon_format: null | string;
	/**
	 * The height of the award icon.
	 */
	icon_height: number;
	/**
	 * The URL of the award icon.
	 */
	icon_url: string;
	/**
	 * The width of the award icon.
	 */
	icon_width: number;
	/**
	 * The ID of the award.
	 */
	id: string;
	/**
	 * Indicates whether the award is enabled.
	 */
	is_enabled: boolean;
	/**
	 * Indicates whether the award is new.
	 */
	is_new: boolean;
	/**
	 * The name of the award.
	 */
	name: string;
	/**
	 * The amount of money donated in pennies.
	 */
	penny_donate: null;
	/**
	 * The price of the award in pennies.
	 */
	penny_price: number | null;
	/**
	 * The resized icons of the award.
	 */
	resized_icons: ResizedIcon[];
	/**
	 * The resized static icons of the award.
	 */
	resized_static_icons: ResizedIcon[];
	/**
	 * The start date of the award.
	 */
	start_date: null;
	/**
	 * The height of the static award icon.
	 */
	static_icon_height: number;
	/**
	 * The URL of the static award icon.
	 */
	static_icon_url: string;
	/**
	 * The width of the static award icon.
	 */
	static_icon_width: number;
	/**
	 * The duration in seconds the award is sticky.
	 */
	sticky_duration_seconds: null;
	/**
	 * The number of subreddit coins rewarded for the award.
	 */
	subreddit_coin_reward: number;
	/**
	 * The ID of the subreddit.
	 */
	subreddit_id: null;
	/**
	 * The tiers of the award based on required awardings.
	 */
	tiers_by_required_awardings: null;
}

/**
 * Represents a resized icon.
 */
export interface ResizedIcon {
	/**
	 * The height of the resized icon.
	 */
	height: number;
	/**
	 * The URL of the resized icon.
	 */
	url: string;
	/**
	 * The width of the resized icon.
	 */
	width: number;
}

/**
 * Represents a piece of rich text in a flair.
 */
export interface FlairRichtext {
	/**
	 * The type of the flair.
	 */
	e: FlairType;
	/**
	 * The text content of the flair.
	 */
	t: string;
}

/**
 * Represents the gildings of a Reddit post or comment.
 */
export interface Gildings {
	gid_2?: number;
}

/**
 * Represents a media object.
 */
export interface Media {
	oembed?: Oembed;
	reddit_video?: RedditVideo;
	type?: string;
}

/**
 * Represents the Oembed object.
 */
export interface Oembed {
	author_name: string;
	description: string;
	height: number;
	html: string;
	provider_name: string;
	provider_url: string;
	thumbnail_height: number;
	thumbnail_url: string;
	thumbnail_width: number;
	title: string;
	type: string;
	version: string;
	width: number;
}

/**
 * Represents a video from Reddit.
 */
export interface RedditVideo {
	bitrate_kbps: number;
	dash_url: string;
	duration: number;
	fallback_url: string;
	height: number;
	hls_url: string;
	is_gif: boolean;
	scrubber_media_url: string;
	transcoding_status: TranscodingStatus;
	width: number;
}

/**
 * Represents the media embed information.
 */
export interface MediaEmbed {
	content?: string;
	height?: number;
	media_domain_url?: string;
	scrolling?: boolean;
	width?: number;
}

/**
 * Represents a preview of a post on Reddit.
 */
export interface Preview {
	enabled: boolean;
	images: Image[];
	reddit_video_preview?: RedditVideo;
}

/**
 * Represents an image object.
 */
export interface Image {
	id: string;
	resolutions: ResizedIcon[];
	source: ResizedIcon;
	variants: Variants;
}

/**
 * Represents the variants for a component.
 */
export interface Variants {}

/**
 * Represents a Reddit bearer token.
 */
export interface RedditOauth2TokenResult {
	/**
	 * The access token.
	 */
	access_token: string;
	/**
	 * The device ID.
	 */
	device_id: string;
	/**
	 * The expiration time in seconds.
	 */
	expires_in: number;
	/**
	 * The scope of the token.
	 */
	scope: string;
	/**
	 * The token type, which is always 'bearer'.
	 */
	token_type: 'bearer';
}

/**
 * Represents a Reddit bearer token parsed by the library.
 */
export interface RedditBearerToken {
	/**
	 * The expiration time in seconds.
	 */
	expiresAt: number;
	/**
	 * The access token.
	 */
	token: string;
}

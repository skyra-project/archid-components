/**
 * An error thrown by `fetchRedditPost` if no post key could be extracted from the {@link RedditParseException['link']}
 */
export class RedditParseException extends Error {
	/**
	 * Represents an exception that occurs during parsing of Reddit data.
	 * @param message - The message to display
	 * @param subreddit - The subreddit that was being parsed
	 * @param key - The key that was being parsed
	 */
	public constructor(
		message: string,
		public readonly subreddit: string,
		public readonly key: string
	) {
		super(message);
	}
}

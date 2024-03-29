/**
 * An error thrown by `fetchRedditPost` if no post key could be extracted from the {@link RedditParseException['link']}
 */
export class RedditParseException extends Error {
	/**
	 * The link that caused the exception
	 */
	public link: string;

	/**
	 * Represents an exception that occurs during parsing of Reddit data.
	 * @param message - The message to display
	 * @param link - The link that caused the exception
	 */
	public constructor(message: string, link: string) {
		super(message);
		this.link = link;
	}
}

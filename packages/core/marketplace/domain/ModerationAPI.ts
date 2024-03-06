/**
 * Interface representing the ModerationAPI.
 * It defines methods related to text moderation.
 */
export default interface ModerationAPI {
    /**
     * Cleans the provided text based on moderation rules.
     * @param {string} text - The text to be cleaned.
     * @returns {string} - The cleaned text.
     */
    clean(text: string): string;
}

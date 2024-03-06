import ModerationAPI from "../domain/ModerationAPI";
import Filter from "bad-words";
import words from "../utils/words.json" assert { type: "json" };

/**
 * Implementation of the ModerationAPI using a filter for bad words.
 * Extends the base ModerationAPI interface.
 */
export default class BadWordsModeration implements ModerationAPI {
    /**
     * The string to replace bad words with during the moderation process.
     * @type {string}
     * @private
     */
    private readonly replaceWith: string;

    /**
     * Creates an instance of the BadWordsModeration.
     * @param {string} replaceWith - The string to replace bad words with during the moderation process.
     */
    constructor(replaceWith: string) {
        this.replaceWith = replaceWith;
    }

    /**
     * Cleans the provided text by replacing bad words with the specified string.
     * @param {string} text - The text to be cleaned.
     * @returns {string} - The cleaned text.
     */
    clean(text: string): string {
        // Create a filter with specified placeholder and add bad words
        let filter = new Filter({ placeHolder: this.replaceWith });
        filter.addWords(...words.words);

        // Clean the text using the filter
        return filter.clean(text);
    }
}

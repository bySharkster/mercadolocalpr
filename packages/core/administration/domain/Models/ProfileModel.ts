/**
 * Represents a model for a UserProfile.
 */

export default class ProfileModel {
    /**
     * @type {string} - The unique identifier of the user.
     */
    public id: string;

    /**
     * @type {string} - The username of the user.
     */

    public username: string;

    /**
     * @type {string} - The email of the user.
     */

    public email: string;

    /**
     * @type {string} - The Description of the user.
     */

    public description: string;

    /**
     * @type {string} - The URL of the photo associated with the avatar of the user.
     */

    public profile_image_url: string;

    /**
     * @type {string} - The URL of the photo associated with the cover of the user.
     */

    public banner_image_url: string;

    /**
     * @type {string} - The timestamp when the user updated his profile.
     */

    public updated_at: string;

    /**
     * Creates am omstamce pf the ProfileModel.
     * @param {string} id - The unique identifier of the user.
     * @param {string} username - The username of the user.
     * @param {string} email - The email of the user.
     * @param {string} description - The Description of the user.
     * @param {string} profile_image_url - The URL of the photo associated with the avatar of the user.
     * @param {string} banner_image_url - The URL of the photo associated with the cover of the user.
     * @param {string} updated_at - The timestamp when the user updated his profile.
     */
    constructor(
        id: string,
        username: string,
        email: string,
        description: string,
        profile_image_url: string,
        banner_image_url: string,
        updated_at: string
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.description = description;
        this.profile_image_url = profile_image_url;
        this.banner_image_url = banner_image_url;
        this.updated_at = updated_at;
    }
}
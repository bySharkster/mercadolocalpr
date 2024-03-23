/**
 * Represents a model for a post.
 */
export default class PostModel {
    /**
     * @type {string} - The unique identifier of the post.
     */
    public id: string;

    /**
     * @type {string} - The title of the post.
     */
    public title: string;

    /**
     * @type {string} - The description of the post.
     */
    public description: string;

    /**
     * @type {number} - The price of the post.
     */
    public price: number;

    /**
     * @type {string} - The location id of the post.
     */
    public locationId: string;

    /**
     * @type {string} - The unique identifier of the user who created the post.
     */
    public sellerId: string;

    /**
     * @type {string} - The category id of the post.
     */
    public categoryId: string;

    /**
     * @type {string} - The URL of the photo associated with the post.
     */
    public photoUrl: string;

    /**
     * @type {boolean} - Flag indictating if the post was moderated.
     */
    public isModerated: boolean;

    /**
     * @type {boolean} - Flag indictating if the post was moderated.
     */
    public isClosed: boolean;

    /**
     * @type {string} - The timestamp when the post was created.
     */
    public createdAt: string;

    /**
     * @type {string} - The timestamp when the post expires.
     */
    public expiresAt: string;

    /**
     * Creates an instance of the PostModel.
     * @param {string} id - The unique identifier of the post.
     * @param {string} title - The title of the post.
     * @param {string} description - The description of the post.
     * @param {number} price - The price of the post.
     * @param {string} locationId - The location id of the post.
     * @param {string} sellerId - The unique identifier of the user who created the post.
     * @param {string} categoryId - The category id of the post.
     * @param {string} photoUrl - The URL of the photo associated with the post.
     * @param {boolean} isClosed - Flag indictating if the post was closed.
     * @param {boolean} isModerated - Flag indictating if the post was moderated.
     * @param {string} createdAt - The timestamp when the post was created.
     * @param {string} expiresAt - The timestamp when the post expires.
     */
    constructor(
        id: string,
        title: string,
        description: string,
        price: number,
        locationId: string,
        sellerId: string,
        categoryId: string,
        photoUrl: string,
        isModerated: boolean,
        isClosed: boolean,
        createdAt: string,
        expiresAt: string,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.locationId = locationId;
        this.sellerId = sellerId;
        this.categoryId = categoryId;
        this.photoUrl = photoUrl;
        this.isModerated = isModerated;
        this.isClosed = isClosed;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }
}

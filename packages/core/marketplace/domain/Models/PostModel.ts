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
     * @type {string} - The location of the post.
     */
    public location: string;

    /**
     * @type {string} - The unique identifier of the user who created the post.
     */
    public sellerId: string;

    /**
     * @type {string} - The category of the post.
     */
    public category: string;

    /**
     * @type {string} - The URL of the photo associated with the post.
     */
    public photoUrl: string;

    /**
     * @type {boolean} - Flag indictating if the post was moderated.
     */
    public isModerated: boolean;

    /**
     * @type {string} - The timestamp when the post was created.
     */
    public createdAt: string;

    /**
     * Creates an instance of the PostModel.
     * @param {string} id - The unique identifier of the post.
     * @param {string} title - The title of the post.
     * @param {string} description - The description of the post.
     * @param {number} price - The price of the post.
     * @param {string} location - The location of the post.
     * @param {string} sellerId - The unique identifier of the user who created the post.
     * @param {string} category - The category of the post.
     * @param {string} photoUrl - The URL of the photo associated with the post.
     * @param {boolean} isModerated - Flag indictating if the post was moderated.
     * @param {string} createdAt - The timestamp when the post was created.
     */
    constructor(
        id: string,
        title: string,
        description: string,
        price: number,
        location: string,
        sellerId: string,
        category: string,
        photoUrl: string,
        isModerated: boolean,
        createdAt: string,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.location = location;
        this.sellerId = sellerId;
        this.category = category;
        this.photoUrl = photoUrl;
        this.isModerated = isModerated;
        this.createdAt = createdAt;
    }
}

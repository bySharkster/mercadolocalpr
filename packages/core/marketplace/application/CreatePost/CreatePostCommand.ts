import Command from "../../../shared/application/Command";

/**
 * Command class representing the intention to create a new post in the application.
 * This command carries the necessary data for creating a post, such as title, description, etc.
 * It extends the base Command class.
 */
export default class CreatePostCommand extends Command {
    /**
     * The unique identifier of the post being created.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly postId: string;

    /**
     * The title of the post.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly title: string;

    /**
     * The description of the post.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly description: string;

    /**
     * The price of the item being sold in the post.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly price: string;

    /**
     * The location or region id associated with the post.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly locationId: string;

    /**
     * The unique identifier of the seller creating the post.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly sellerId: string;

    /**
     * The category or type of the item being posted.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly category: string;

    /**
     * The URL of the photo associated with the post.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly photoUrl: string;

    /**
     * Creates an instance of CreatePostCommand.
     *
     * @constructor
     * @param {string} postId - The unique identifier of the post being created.
     * @param {string} title - The title of the post.
     * @param {string} description - The description of the post.
     * @param {string} price - The price of the item being sold in the post.
     * @param {string} locationId - The location or region id associated with the post.
     * @param {string} sellerId - The unique identifier of the seller creating the post.
     * @param {string} category - The category or type of the item being posted.
     * @param {string} photoUrl - The URL of the photo associated with the post.
     */
    constructor(
        postId: string,
        title: string,
        description: string,
        price: string,
        locationId: string,
        sellerId: string,
        category: string,
        photoUrl: string
    ) {
        super();
        this.postId = postId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.locationId = locationId;
        this.sellerId = sellerId;
        this.category = category;
        this.photoUrl = photoUrl;
    }
}

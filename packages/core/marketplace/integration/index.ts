import Post from "../domain/Entities/Post/Post";
import PostModel from "../domain/Models/PostModel";
import PostReadModelStore from "../domain/PostReadModelStore";
import PostRepository from "../domain/Repositories/PostRepository";
import MarketplaceService from "./contracts";

/**
 * Provides functionality related to the marketplace, including operations on posts
 * such as checking existence and moderation status. This class implements the MarketplaceService
 * interface, using a PostRepository for data access and manipulation.
 *
 * @class MarketplaceAPI
 * @typedef {MarketplaceAPI}
 * @implements {MarketplaceService}
 */
export default class MarketplaceAPI implements MarketplaceService {
    /**
     * Repository for interacting with post entities. Provides access to post data.
     * @private
     * @type {PostRepository}
     */
    private postRepository: PostRepository;

    /**
     * Store for managing post read models. This facilitates operations like updates and queries
     * on a read-optimized view of post data.
     *
     * @private
     * @type {PostReadModelStore}
     */
    private postReadModel: PostReadModelStore;

    /**
     * Constructs a MarketplaceAPI instance with necessary repositories and stores for managing posts.
     * @param {PostRepository} postRepository Repository for accessing and manipulating post entities.
     * @param {PostReadModelStore} postReadModel Store for read-optimized post data management.
     */
    constructor(postRepository: PostRepository, postReadModel: PostReadModelStore) {
        this.postRepository = postRepository;
        this.postReadModel = postReadModel;
    }

    /**
     * Marks a post as unmoderated in the marketplace by setting its moderation status to false
     * within the read model store. This operation is performed asynchronously.
     *
     * @public
     * @param {string} id The unique identifier of the post to be marked as unmoderated.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    public async markPostAsUnmoderated(id: string): Promise<void> {
        let model: PostModel | null = await this.postReadModel.get(id);

        if (model) {
            model.isModerated = false;
            await this.postReadModel.update(model);
        }
    }

    /**
     * Asynchronously checks if a post exists in the marketplace and is not marked as deleted.
     * This method utilizes the post repository to load post events and reconstructs the post
     * to determine its existence and deletion status.
     *
     * @public
     * @param {string} id The unique identifier of the post to check.
     * @returns {Promise<boolean>} A promise that resolves to true if the post exists and is not deleted, otherwise false.
     */
    public async postExists(id: string): Promise<boolean> {
        let events = await this.postRepository.loadEvents(id);

        if (events.length == 0) return false;

        let post = new Post(events);

        if (post.isDeleted) return false;

        return true;
    }
}

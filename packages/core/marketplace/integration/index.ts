import Post from "../domain/Entities/Post/Post";
import PostRepository from "../domain/Repositories/PostRepository";
import MarketplaceService from "./contracts";

/**
 * Implements MarketplaceService to provide marketplace functionalities.
 * It uses a PostRepository to interact with post data.
 *
 * @class MarketplaceAPI
 * @typedef {MarketplaceAPI}
 * @implements {MarketplaceService}
 */
export default class MarketplaceAPI implements MarketplaceService {
    /**
     * The repository for interacting with posts.
     * @private
     * @type {PostRepository}
     */
    private postRepository: PostRepository;

    /**
     * Creates an instance of MarketplaceAPI.
     * @param {PostRepository} postRepository The post repository to be used by this service.
     */
    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    /**
     * Checks if a post exists and is not deleted.
     *
     * @param {string} id The unique identifier of the post.
     * @returns {Promise<boolean>} A promise that resolves to true if the post exists and is not deleted, otherwise false.
     */
    public async postExists(id: string): Promise<boolean> {
        let events = await this.postRepository.loadEvents(id);

        if(events.length == 0) return false;
        
        let post = new Post(events);

        if(post.isDeleted) return false;

        return true;
    }
}

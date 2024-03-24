import Command from "../../../shared/application/Command";

/**
 * Command for reducing the price of an item.
 * This command is used in the context of a marketplace application,
 * allowing sellers to reduce the price of their posted items.
 *
 * @class ReducePriceCommand
 * @typedef {ReducePriceCommand}
 * @extends {Command}
 */
export default class ReducePriceCommand extends Command {
    /**
     * Creates an instance of ReducePriceCommand.
     *
     * @constructor
     * @param {string} sellerId The unique identifier for the seller.
     * @param {string} postId The unique identifier for the post whose price is to be reduced.
     * @param {string} newPrice The new price for the item. Should be a string representing a numeric value.
     */
    constructor(
        public readonly sellerId: string,
        public readonly postId: string,
        public readonly newPrice: string,
    ) {
        super();
    }
}

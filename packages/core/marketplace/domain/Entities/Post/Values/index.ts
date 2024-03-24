import * as values from "../../../../../shared/domain/Values";

/**
 * Represents the unique identifier for a Post.
 * It extends the base Id class from the values module.
 */
export class PostId extends values.Id {
    /**
     * Creates an instance of the PostId class.
     * @param {string} id - The unique identifier for the Post.
     */
    constructor(public readonly id: string) {
        super();
    }
}

/**
 * Represents information about a Post.
 * It extends the base ValueObject class from the values module.
 */
export class PostInfo extends values.ValueObject {
    private static MINIMUM_TITLE_LENGTH = 10;
    private static MINIMUM_LOCATION_LENGTH = 10;
    private static MINIMUM_DESCRIPTION_LENGTH = 10;

    /**
     * Creates an instance of the PostInfo class.
     * @param {string} title - The title of the Post.
     * @param {string} photoUrl - The URL of the photo associated with the Post.
     * @param {string} location - The location of the Post.
     * @param {string} description - The description of the Post.
     * @throws {Error} - Throws an error if the title, location, or description length is below the minimum required.
     */
    constructor(
        public readonly title: string,
        public readonly photoUrl: string,
        public readonly location: string,
        public readonly description: string,
    ) {
        super();

        if (title.length < PostInfo.MINIMUM_TITLE_LENGTH) {
            throw new Error(`Title must have at least ${PostInfo.MINIMUM_TITLE_LENGTH} characters.`);
        }

        if (location.length < PostInfo.MINIMUM_LOCATION_LENGTH) {
            throw new Error(`Location must have at least ${PostInfo.MINIMUM_LOCATION_LENGTH} characters.`);
        }

        if (description.length < PostInfo.MINIMUM_DESCRIPTION_LENGTH) {
            throw new Error(`Description must have at least ${PostInfo.MINIMUM_DESCRIPTION_LENGTH} characters.`);
        }

        this.title = title;
        this.location = location;
        this.photoUrl = photoUrl;
        this.description = description;
    }
}

/**
 * Represents the unique identifier for the category of a Post.
 * It extends the base Id class from the values module.
 */
export class PostCategoryId extends values.Id {
    /**
     * Creates an instance of the PostCategoryId class.
     * @param {string} id - The unique identifier for the Post category.
     */
    constructor(public readonly id: string) {
        super();
    }
}

/**
 * Represents the price information for a Post.
 * It extends the base ValueObject class from the values module.
 */
export class PostPrice extends values.ValueObject {
    public readonly price: number;

    /**
     * Creates an instance of the PostPrice class.
     * @param {string} price - The price value for the Post.
     * @throws {Error} - Throws an error if the provided price is not a valid number.
     */
    constructor(price: string) {
        super();
        try {
            this.price = Number(price);
        } catch (err) {
            throw new Error(`Price '${price}' is not a valid price.`);
        }
    }
    
    /**
     * Check if the current price is a reduction from the given price.
     *
     * @public
     * @param {PostPrice} other
     * @returns {boolean}
     */
    public isReducedFrom(other: PostPrice): boolean {
        return this.price < other.price;
    }
}

/**
 * Represents the unique identifier for a User.
 * It extends the base Id class from the values module.
 */
export class SellerId extends values.Id {
    /**
     * Creates an instance of the SellerId class.
     * @param {string} id - The unique identifier for the User.
     */
    constructor(public readonly id: string) {
        super();
    }

    /**
     * Checks if this SellerId is equal to another SellerId.
     * @param {SellerId} other - The other SellerId to compare.
     * @returns {boolean} - True if the SellerId values are equal, otherwise false.
     */
    public equals(other: SellerId): boolean {
        return this.id === other.id;
    }
}


/**
 * Represents the effective and expiration dates for a post, ensuring the post is associated with a valid time range.
 * Inherits from a value object base class to provide common functionality for value equality.
 *
 * @class PostEffectiveRange
 * @typedef {PostEffectiveRange}
 * @extends {values.ValueObject}
 */
export class PostEffectiveRange extends values.ValueObject {
    
    /**
     * The date when the post becomes effective and starts being relevant.
     * Once set, it cannot be modified.
     *
     * @public
     * @readonly
     * @type {Date}
     */
    public readonly effectiveDate: Date;
    
    /**
     * The expiration date after which the post is considered outdated or no longer relevant.
     * Once set, it cannot be modified.
     *
     * @public
     * @readonly
     * @type {Date}
     */
    public readonly expirationDate: Date;

    /**
     * Creates an instance of PostEffectiveRange with specified effective and expiration dates.
     *
     * @constructor
     * @param {Date} effectiveDate The date from which the post is considered active.
     * @param {Date} expirationDate The date after which the post is considered expired.
     */
    constructor(effectiveDate: Date, expirationDate: Date) {
        super();
        this.effectiveDate = effectiveDate;
        this.expirationDate = expirationDate;
    }

    /**
     * Creates a PostEffectiveRange object that expires after a specified number of days from the current date.
     * Useful for creating posts with a defined active duration.
     *
     * @public
     * @static
     * @param {number} numDays The number of days after which the post should expire.
     * @returns {PostEffectiveRange} A new instance of PostEffectiveRange with calculated effective and expiration dates.
     */
    public static expiresIn(numDays: number): PostEffectiveRange  {
        const effective = new Date();
        const expiration = new Date();

        expiration.setDate(effective.getDate() + numDays);

        return new PostEffectiveRange(effective, expiration);
    }

    /**
     * Creates a PostEffectiveRange object from string representations of the effective and expiration dates.
     * This is particularly useful when dealing with date inputs in string format, such as from user input or external data sources.
     *
     * @public
     * @static
     * @param {string} effectiveDate A string representation of the effective date.
     * @param {string} expirationDate A string representation of the expiration date.
     * @returns {PostEffectiveRange} A new instance of PostEffectiveRange with parsed effective and expiration dates.
     */
    public static fromString(effectiveDate: string, expirationDate: string): PostEffectiveRange {
        const effective = new Date(effectiveDate);
        const expiration = new Date(expirationDate);
        
        return new PostEffectiveRange(effective, expiration);
    }
}
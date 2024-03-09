/**
 * Represents the outcome of an operation, encapsulating success or failure status along with an optional error message.
 * This class provides a fluent interface to distinguish between successful and failed outcomes in a clear and consistent manner.
 *
 * @class Result
 * @typedef {Result}
 */
export default class Result {
    /**
     * Indicates whether the operation was successful. It's true for success and false for failure.
     *
     * @private
     * @readonly
     * @type {boolean}
     */
    private readonly isSuccess: boolean;

    /**
     * Stores an error message in case of failure. It's null for successful operations.
     *
     * @private
     * @readonly
     * @type {(string|null)}
     */
    private readonly error: string|null;

    /**
     * Creates an instance of Result, initializing it with the operation's success status and an optional error message.
     *
     * @constructor
     * @param {boolean} isSuccess Indicates the success status of the operation.
     * @param {(string|null)} error An optional error message describing the failure reason, if any.
     */
    constructor(isSuccess: boolean, error: string|null) {
        this.isSuccess = isSuccess;
        this.error = error;
    }

    /**
     * Factory method to create a successful Result object without an error message.
     *
     * @public
     * @static
     * @returns {Result} An instance of Result representing a successful operation.
     */
    public static success(): Result {
        return new Result(true, null);
    }

    /**
     * Factory method to create a failed Result object with an error message.
     *
     * @public
     * @static
     * @param {string} error The error message describing why the operation failed.
     * @returns {Result} An instance of Result representing a failed operation.
     */
    public static failure(error: string): Result {
        return new Result(false, error);
    }

    /**
     * Determines if the Result instance represents a failure.
     *
     * @public
     * @returns {boolean} Returns true if the operation failed (i.e., isSuccess is false), otherwise false.
     */
    public isFailure(): boolean {
        return !this.isSuccess;
    }

    /**
     * Provides read-only access to the error message. It's null for successful operations.
     *
     * @public
     * @readonly
     * @type {(string|null)}
     */
    public get errorMessage(): string|null {
        return this.error;
    }
    
}
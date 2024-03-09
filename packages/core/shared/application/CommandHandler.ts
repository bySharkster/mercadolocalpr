import Command from "./Command";
import Result from "./Result";

/**
 * Abstract class representing a handler for a specific command type.
 * Command handlers are responsible for executing the logic associated with a command.
 * This class serves as a blueprint for creating concrete command handler implementations
 * that can process specific types of commands within an application.
 */
export default abstract class CommandHandler {

    /**
     * Handles the execution of a given command.
     * This method must be implemented by subclasses to define the specific logic
     * for processing the command. The processing logic can include operations such as
     * validating command data, performing business logic operations, and generating a result.
     *
     * @public
     * @abstract
     * @param {Command} cmd - The command object to be handled. This object contains
     *                        the necessary information for the command execution.
     * @returns {Promise<Result>} A promise that resolves to the result of the command execution.
     *                            The result can include success or failure information,
     *                            along with any data produced by the command's execution.
     */
    public abstract handle(cmd: Command): Promise<Result>;
}

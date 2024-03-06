import Command from "./Command";

/**
 * Abstract class representing a handler for a specific command type.
 * Command handlers are responsible for executing the logic associated with a command.
 */
export default abstract class CommandHandler {
    /**
     * Handles the provided command by executing the associated logic.
     * @param {Command} cmd - The command to be handled.
     */
    public async handle(cmd: Command): Promise<void> {
        // Implement logic to handle the command
    }
}

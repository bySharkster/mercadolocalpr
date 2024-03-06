import DomainEvent from "../domain/DomainEvent";
import Command from "./Command";
import CommandHandler from "./CommandHandler";
import DomainEventHandler from "./DomainEventHandler";


/**
 * AbstractMessageBus defines the contract for a message bus that handles command execution and event dispatching.
 */
export default interface AbstractMessageBus {
    /**
     * Executes a command by locating its handler and invoking the handler's handle method.
     * @param {Command} cmd - The command to be executed.
     */
    execute(cmd: Command): Promise<void>;

    /**
     * Dispatches a domain event by invoking the handle method on all registered event handlers for the event type.
     * @param {DomainEvent} evt - The domain event to be dispatched.
     */
    dispatch(evt: DomainEvent): Promise<void>;

    /**
     * Registers a command handler with the specified name.
     * @param {string} name - The name of the command.
     * @param {CommandHandler} handler - The handler for the command.
     */
    registerCommand(name: string, handler: CommandHandler): void;

    /**
     * Registers an event handler with the specified name.
     * If no handlers are registered for the event, it initializes an empty array for the event type.
     * @param {string} name - The name of the event.
     * @param {DomainEventHandler} handler - The handler for the event.
     */
    registerEvent(name: string, handler: DomainEventHandler): void;
}
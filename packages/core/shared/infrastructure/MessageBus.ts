import DomainEvent from "../domain/DomainEvent";
import Command from "../application/Command";
import CommandHandler from "../application/CommandHandler";
import DomainEventHandler from "../application/DomainEventHandler";
import AbstractMessageBus from "../application/AbstractMessageBus";
import ChangeTracker from "../application/ChangeTracker";
import Result from "../application/Result";

/**
 * Interface representing a mapping of command names to their corresponding handlers.
 */
interface CommandHandlerMap {
    /**
     * Mapping of command names to their corresponding handlers.
     */
    [index: string]: CommandHandler;
}

/**
 * Interface representing a mapping of event names to arrays of event handlers.
 */
interface EventHandlerMap {
    /**
     * Mapping of event names to arrays of event handlers.
     */
    [index: string]: DomainEventHandler[];
}

/**
 * MessageBus class acts as a central communication hub for executing commands and dispatching domain events.
 * It manages the registration of command and event handlers.
 */
export default class MessageBus implements AbstractMessageBus {
    /**
     * The message bus instance.
     *
     * @private
     * @static
     * @type {MessageBus}
     */
    private static instance: MessageBus;
    /**
     * Mapping of command names to their corresponding handlers.
     * @private
     * @type {CommandHandlerMap}
     */
    private commandHandlers: CommandHandlerMap;

    /**
     * Mapping of event names to arrays of event handlers.
     * @private
     * @type {EventHandlerMap}
     */
    private eventHandlers: EventHandlerMap;

    /**
     * Creates an instance of the MessageBus class.
     */
    private constructor() {
        this.commandHandlers = {};
        this.eventHandlers = {};
    }

    /**
     * Singleton instance of the MessageBus.
     *
     * @public
     * @static
     * @param {Function} initialSetup - The function to set up the initial state of the MessageBus instance.
     * @returns {MessageBus}
     */
    public static getInstance(initialSetup: Function): MessageBus {
        if (!MessageBus.instance) {
            MessageBus.instance = new MessageBus();
            initialSetup(MessageBus.instance);
        }

        return MessageBus.instance;
    }

    /**
     * Executes a command by locating its handler and invoking the handler's handle method.
     * @param {Command} cmd - The command to be executed.
     * @throws {Error} - Throws an error if no handler is found for the command.
     */
    public async execute(cmd: Command): Promise<Result> {
        let handler = this.getCommandHandler(cmd.constructor.name);

        if (!handler)
            throw new Error("No handler found");

        let result = await handler.handle(cmd);
        await this.handleNewEvents();
        return result;
    }

    /**
     * Handles any new events in the event queue.
     *
     * @private
     * @returns {Promise<void>}
     */
    private async handleNewEvents(): Promise<void> {
        let events = this.getNewEvents();

        while (events.length > 0) {
            let evt = events.at(0);

            events = events.slice(1);

            if (evt) await this.dispatch(evt);

            events = events.concat(this.getNewEvents());
        }
    }

    /**
     * Dispatches a domain event by invoking the handle method on all registered event handlers for the event type.
     * @param {DomainEvent} evt - The domain event to be dispatched.
     * @returns {Promise<void>}
     */
    public async dispatch(evt: DomainEvent): Promise<void> {
        for (const handler of this.eventHandlers[evt.constructor.name] || []) {
            await handler.handle(evt);
        }

        await this.handleNewEvents();
    }

    /**
     * Gets the command handler for a given command name.
     * @param {string} name - The name of the command.
     * @returns {CommandHandler | undefined} - The command handler, or undefined if not found.
     */
    private getCommandHandler(name: string): CommandHandler | undefined {
        return this.commandHandlers[name];
    }

    /**
     * Registers a command handler with the specified name.
     * @param {string} name - The name of the command.
     * @param {CommandHandler} handler - The handler for the command.
     */
    public registerCommand(name: string, handler: CommandHandler): void {
        this.commandHandlers[name] = handler;
    }

    /**
     * Registers an event handler with the specified name.
     * If no handlers are registered for the event, it initializes an empty array for the event type.
     * @param {string} name - The name of the event.
     * @param {DomainEventHandler} handler - The handler for the event.
     */
    public registerEvent(name: string, handler: DomainEventHandler): void {
        if (!this.eventHandlers[name]) {
            this.eventHandlers[name] = [];
        }

        this.eventHandlers[name].push(handler);
    }

    /**
     * Gets any new events from the change tracker.
     *
     * @private
     * @returns {DomainEvent[]}
     */
    private getNewEvents(): DomainEvent[] {
        return ChangeTracker.getNewEvents();
    }
}
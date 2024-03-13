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
 * It manages the registration of command and event handlers and provides mechanisms for queuing and processing
 * domain events. This class implements the singleton pattern to ensure only one instance exists throughout the application.
 */
export default class MessageBus implements AbstractMessageBus {
    /**
     * The single instance of the MessageBus.
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
     * A queue of domain events that have been enqueued for processing.
     *
     * @private
     * @type {DomainEvent[]}
     */
    private enqueuedEvents: DomainEvent[];

    /**
     * Private constructor to prevent direct construction calls with the `new` operator.
     */
    private constructor() {
        this.commandHandlers = {};
        this.eventHandlers = {};
        this.enqueuedEvents = [];
    }

    /**
     * Enqueues a list of domain events to be processed.
     *
     * @public
     * @param {DomainEvent[]} events The events to enqueue.
     */
    public enqueue(events: DomainEvent[]): void {
        this.enqueuedEvents = this.enqueuedEvents.concat(events);
    }

    /**
     * Returns the singleton instance of the MessageBus, creating it if it does not already exist.
     *
     * @public
     * @static
     * @param {Function} initialSetup - A function to perform initial setup of the MessageBus instance.
     * @returns {MessageBus} The singleton instance of the MessageBus.
     */
    public static getInstance(initialSetup: Function): MessageBus {
        if (!MessageBus.instance) {
            MessageBus.instance = new MessageBus();
            initialSetup(MessageBus.instance);
        }

        return MessageBus.instance;
    }

    /**
     * Executes a given command by finding its corresponding handler and invoking the handler's handle method.
     * If no handler is found for the command, an error is thrown.
     *
     * @param {Command} cmd - The command to execute.
     * @throws {Error} - Throws an error if no handler is found for the command.
     * @returns {Promise<Result>} The result of executing the command.
     */
    public async execute(cmd: Command): Promise<Result> {
        let handler = this.getCommandHandler(cmd.constructor.name);

        if (!handler)
            throw new Error("No handler found for the command.");

        let result = await handler.handle(cmd);
        await this.handleNewEvents();
        return result;
    }

    /**
     * Handles any new events that have been generated or enqueued, processing them sequentially.
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
     * Dispatches a domain event to all registered handlers for the event's type.
     *
     * @param {DomainEvent} evt - The domain event to dispatch.
     * @returns {Promise<void>}
     */
    public async dispatch(evt: DomainEvent): Promise<void> {
        for (const handler of this.eventHandlers[evt.constructor.name] || []) {
            await handler.handle(evt);
        }

        await this.handleNewEvents();
    }

    /**
     * Retrieves the command handler for a specific command name, if one is registered.
     *
     * @private
     * @param {string} name - The name of the command.
     * @returns {CommandHandler | undefined} The command handler, if found; otherwise, undefined.
     */
    private getCommandHandler(name: string): CommandHandler | undefined {
        return this.commandHandlers[name];
    }

    /**
     * Registers a command handler for a specific command name.
     *
     * @param {string} name - The name of the command.
     * @param {CommandHandler} handler - The command handler to register.
     */
    public registerCommand(name: string, handler: CommandHandler): void {
        this.commandHandlers[name] = handler;
    }

    /**
     * Registers an event handler for a specific event name.
     *
     * @param {string} name - The name of the event.
     * @param {DomainEventHandler} handler - The event handler to register.
     */
    public registerEvent(name: string, handler: DomainEventHandler): void {
        if (!this.eventHandlers[name]) {
            this.eventHandlers[name] = [];
        }

        this.eventHandlers[name].push(handler);
    }

    /**
     * Retrieves any new events that have been generated, combining them with events that have been previously enqueued.
     *
     * @private
     * @returns {DomainEvent[]} The list of new and enqueued events.
     */
    private getNewEvents(): DomainEvent[] {
        let newEvents = ChangeTracker.getNewEvents();
        newEvents = newEvents.concat(this.popEnqueuedEvents());
        return newEvents;
    }

    /**
     * Removes and returns all events currently enqueued in the MessageBus.
     *
     * @private
     * @returns {DomainEvent[]} The list of enqueued events.
     */
    private popEnqueuedEvents(): DomainEvent[] {
        let events = this.enqueuedEvents;
        this.enqueuedEvents = [];
        return events;
    }
}

import type { EventAction, EventPayload, PropertiesOnly } from "../models/type";
import { dispatchCustomEvent } from "../utils/common";
import { Logger } from "../utils/logger";

/**
 * Represents a tracker listener event.
 */
export class TrackerListenerEvent {
  /**
   * The action associated with the event.
   */
  public action: Exclude<EventAction, "seen">;

  /**
   * The name of the event.
   */
  public eventName: string;

  /**
   * Indicates whether the event should only be triggered once.
   */
  public once?: boolean;

  /**
   * The payload associated with the event.
   */
  public payload: EventPayload;

  /**
   * Creates a new TrackerListenerEvent instance.
   * @param params - The parameters for initializing the event.
   */
  constructor(params: PropertiesOnly<TrackerListenerEvent>) {
    this.action = params.action;
    this.eventName = params.eventName;
    this.once = params.once || false;
    this.payload = params.payload;
  }

  /**
   * Subscribes to the event on the specified event tracker container.
   * @param eventTrackerContainer - The event tracker container to subscribe to.
   */
  subscribe(eventTrackerContainer: HTMLElement) {
    const nativeEventName = {
      click: "click",
      hover: "mouseover",
    }[this.action];

    eventTrackerContainer.addEventListener(nativeEventName, this.eventCallback(eventTrackerContainer), {
      once: this.once,
    });

    Logger.registered(this.action, this.eventName);
  }

  /**
   * Unsubscribes from the event on the specified event tracker container.
   * @param eventTrackerContainer - The event tracker container to unsubscribe from.
   */
  unsubscribe(eventTrackerContainer: HTMLElement) {
    eventTrackerContainer.removeEventListener("eventracker", this.eventCallback(eventTrackerContainer));
    Logger.unsubscribed(this.action, this.eventName);
  }

  /**
   * Returns a callback function that dispatches a custom event and unsubscribes the event tracker container.
   * @param eventTrackerContainer - The HTMLElement representing the event tracker container.
   * @returns A callback function that dispatches a custom event and unsubscribes the event tracker container.
   */
  eventCallback(eventTrackerContainer: HTMLElement) {
    return () => dispatchCustomEvent(this, eventTrackerContainer, () => this.unsubscribe(eventTrackerContainer));
  }
}

// TODO: Eventleri bir yere topla.
// static variable olarak tutabilirsin

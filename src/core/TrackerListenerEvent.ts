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
  public onlyOnce?: boolean;

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
    this.onlyOnce = params.onlyOnce || false;
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
      once: this.onlyOnce,
    });
    Logger.subscribed(this.action, this.eventName);
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
   * Returns the event callback function.
   * @param eventTrackerContainer - The event tracker container associated with the event.
   * @returns The event callback function.
   */
  eventCallback(eventTrackerContainer: HTMLElement) {
    return () => dispatchCustomEvent(this, eventTrackerContainer);
  }
}

// TODO: Eventleri bir yere topla.
// static variable olarak tutabilirsin

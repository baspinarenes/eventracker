import type { EventAction, EventPayload, PropertiesOnly } from "../models/type";
import { dispatchCustomEvent } from "../utils/common";
import { Logger } from "../utils/logger";

/**
 * Represents a TrackerObserverEvent.
 */
export class TrackerObserverEvent {
  /**
   * The action associated with the event.
   */
  public action: Exclude<EventAction, "click" | "hover">;

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
   * The options for the IntersectionObserver.
   */
  public observerOptions?: IntersectionObserverInit;

  private _observer?: IntersectionObserver;

  /**
   * Creates a new TrackerObserverEvent instance.
   * @param params - The parameters for the TrackerObserverEvent.
   */
  constructor(params: PropertiesOnly<TrackerObserverEvent>) {
    this.action = params.action;
    this.eventName = params.eventName;
    this.once = params.once || false;
    this.payload = params.payload;
    this.observerOptions = params.observerOptions;
  }

  /**
   * Subscribes to the event.
   * @param eventTrackerContainer - The container element to observe.
   */
  subscribe(eventTrackerContainer: HTMLElement) {
    let wasSeen = false;

    this._observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !wasSeen) {
          wasSeen = true;

          dispatchCustomEvent(this, eventTrackerContainer);

          if (this.once) {
            this.unsubscribe(eventTrackerContainer);
          }
        } else {
          wasSeen = false;
        }
      });
    }, this.observerOptions);

    this._observer.observe(eventTrackerContainer);
    Logger.registered(this.action, this.eventName);
  }

  /**
   * Returns the event callback function.
   * @param eventTrackerContainer - The container element to observe.
   * @returns The event callback function.
   */
  eventCallback(eventTrackerContainer: HTMLElement) {
    return () => dispatchCustomEvent(this, eventTrackerContainer);
  }

  /**
   * Unsubscribes from the event.
   * @param eventTrackerContainer - The container element to stop observing.
   */
  unsubscribe(eventTrackerContainer: HTMLElement) {
    this._observer?.unobserve(eventTrackerContainer);
    this._observer?.disconnect();
    this._observer = undefined;
  }
}

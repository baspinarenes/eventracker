import type { EventAction, EventPayload, PropertiesOnly } from "../models/type";
import { dispatchCustomEvent } from "../utils/common";
import { Logger } from "../utils/logger";

export class TrackerObserverEvent {
  public action: Exclude<EventAction, "click" | "hover">;
  public eventName: string;
  public limit?: number;
  public payload: EventPayload;
  public observerOptions?: IntersectionObserverInit;
  private _observer?: IntersectionObserver;

  constructor(params: PropertiesOnly<TrackerObserverEvent>) {
    this.action = params.action;
    this.eventName = params.eventName;
    this.payload = params.payload;
    this.limit = params.limit || undefined;
    this.observerOptions = params.observerOptions;
  }

  subscribe(eventTrackerContainer: HTMLElement) {
    let wasSeen = false;

    this._observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !wasSeen) {
          wasSeen = true;

          this.fireEvent(eventTrackerContainer);
        } else {
          wasSeen = false;
        }
      });
    }, this.observerOptions);

    this._observer.observe(eventTrackerContainer);
    Logger.registered(this.action, this.eventName);
  }

  fireEvent(eventTrackerContainer: HTMLElement) {
    let fireCount = 0;

    return () => {
      dispatchCustomEvent(this, eventTrackerContainer);
      fireCount += 1;
      this.limit && fireCount >= this.limit && this.unsubscribe(eventTrackerContainer);
    };
  }

  unsubscribe(eventTrackerContainer: HTMLElement) {
    this._observer?.unobserve(eventTrackerContainer);
    this._observer?.disconnect();
    this._observer = undefined;
  }
}

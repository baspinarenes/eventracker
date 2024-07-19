import type { EventAction, EventPayload, PropertiesOnly } from "../models/type";
import { dispatchCustomEvent } from "../utils/common";
import { Logger } from "../utils/logger";

export class TrackerListenerEvent {
  public action: Exclude<EventAction, "seen">;
  public eventName: string;
  public limit?: number;
  public payload: EventPayload;

  constructor(params: PropertiesOnly<TrackerListenerEvent>) {
    this.action = params.action;
    this.eventName = params.eventName;
    this.payload = params.payload;
    this.limit = params.limit || undefined;
  }

  subscribe(eventTrackerContainer: HTMLElement) {
    const nativeEventName = {
      click: "click",
      hover: "mouseover",
    }[this.action];

    const callback = this.fireEvent(eventTrackerContainer);
    eventTrackerContainer.addEventListener(nativeEventName, callback, {
      once: this.limit === 1,
    });
    globalThis.eventracker.saveEventToSummary(this.action, this.eventName, callback);
    Logger.registered(this.action, this.eventName);
  }

  unsubscribe(eventTrackerContainer: HTMLElement) {
    const nativeEventName = {
      click: "click",
      hover: "mouseover",
    }[this.action];

    eventTrackerContainer.removeEventListener(
      nativeEventName,
      globalThis.eventracker.summary[this.action]![this.eventName].callback!
    );
    globalThis.eventracker.removeEventFromSummary(this.action, this.eventName);
    Logger.unsubscribed(this.action, this.eventName);
  }

  fireEvent(eventTrackerContainer: HTMLElement) {
    let fireCount = 0;

    return () => {
      dispatchCustomEvent(this, eventTrackerContainer);
      fireCount += 1;
      this.limit && fireCount >= this.limit && this.unsubscribe(eventTrackerContainer);
    };
  }
}

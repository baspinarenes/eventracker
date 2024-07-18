import { ActionEventMap, EventTrackerOptions } from "../models/type";
import { Logger } from "../utils/logger";
import { subscribeEventTracker } from "./subscribeEventTracker";

/**
 * Registers an event tracker for a specific root element.
 * @param eventTrackerRootId - The ID of the root element to attach the event tracker to.
 * @param actionEventMap - A mapping of action to event callbacks.
 */
export function createEventTracker(
  eventTrackerRootId: string,
  actionEventMap: ActionEventMap,
  options?: EventTrackerOptions
) {
  document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector(eventTrackerRootId);

    if (element) {
      element.addEventListener("eventracker", subscribeEventTracker(actionEventMap, options));
      Logger.subscribed("global");
    } else {
      Logger.error("Global event tracker root element not found.");
    }
  });
}

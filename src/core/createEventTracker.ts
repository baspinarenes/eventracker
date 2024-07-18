import { ActionEventMap, EventTrackerOptions } from "../models/type";
import { Logger } from "../utils/logger";
import { subscribeEventTracker } from "./subscribeEventTracker";

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

import { ActionEventMap, CallbackPayload, EventTrackerRegisterOptions } from "../models/type";
import { Logger } from "../utils/logger";

/**
 * Registers an event tracker for a specific root element.
 * @param eventTrackerRootId - The ID of the root element to attach the event tracker to.
 * @param actionEventMap - A mapping of actions to event callbacks.
 */
export function registerEventTracker(
  eventTrackerRootId: string,
  actionEventMap: ActionEventMap,
  options?: EventTrackerRegisterOptions
) {
  document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector(eventTrackerRootId);

    if (element) {
      element.addEventListener("eventracker", (e) => {
        e.stopPropagation();
        const customEventPayload: CallbackPayload = (e as CustomEvent).detail;

        const action = actionEventMap[customEventPayload.action];

        if (!action) {
          Logger.error(`Action not found in the global event tracker: ${customEventPayload.action}`);
          return;
        }

        const eventCallback = action[customEventPayload.eventName];

        if (!eventCallback) {
          Logger.error(
            `Event not found in the global event tracker: ${customEventPayload.action}:${customEventPayload.eventName}`
          );
          return;
        }

        const payload =
          options?.modifier(customEventPayload.payload, customEventPayload.eventName, customEventPayload.action) ||
          customEventPayload.payload;

        eventCallback(payload, customEventPayload.eventName, customEventPayload.action);
      });
    } else {
      Logger.error("Global event tracker root element not found.");
    }
  });
}

import { ActionEventMap, CallbackPayload, EventTrackerOptions } from "../models/type";
import { getConfiguration } from "../utils/common";
import { Logger } from "../utils/logger";

export function subscribeEventTracker(actionEventMap: ActionEventMap, options?: EventTrackerOptions) {
  console.log("subscribeEventTracker");
  return (e: Event) => {
    const customEventPayload: CallbackPayload = (e as CustomEvent).detail;
    console.log("customEventPayload", customEventPayload);
    const action = actionEventMap[customEventPayload.action];
    console.log("action", action);
    const eventCallback = action ? action[customEventPayload.eventName] : undefined;

    if (eventCallback) {
      e.stopPropagation();
      let payload = customEventPayload.payload;

      if (options?.payloadModifier) {
        payload = options.payloadModifier(payload, customEventPayload.eventName, customEventPayload.action);
        Logger.modified(customEventPayload.action, customEventPayload.eventName, payload);
      }

      if (getConfiguration().payloadModifier) {
        payload = getConfiguration().payloadModifier!(payload, customEventPayload.eventName, customEventPayload.action);
        Logger.modified(customEventPayload.action, customEventPayload.eventName, payload, true);
      }

      console.log("payload", payload, customEventPayload.eventName, customEventPayload.action);

      eventCallback(payload, customEventPayload.eventName, customEventPayload.action);
    }
  };
}

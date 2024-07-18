import { useEffect, useRef } from "react";
import { ActionEventMap, CallbackPayload, EventTrackerRegisterOptions } from "../models/type";
import { Logger } from "../utils/logger";
import { isActionEventMap } from "../utils/common";

/**
 * Custom hook for tracking events and executing callbacks based on the events.
 * Use typescript overload to accept two different types of arguments.
 * @param arg1 - Either a selector string or an ActionEventMap object.
 * @param arg2 - Optional ActionEventMap object.
 * @returns - If arg1 is a selector string, returns a ref to the event tracker container element. Otherwise, returns undefined.
 */
export function useEventTracker(
  actionEventMap: ActionEventMap,
  options?: EventTrackerRegisterOptions
): React.MutableRefObject<any>;
export function useEventTracker(
  selector: string,
  actionEventMap: ActionEventMap,
  options?: EventTrackerRegisterOptions
): void;
export function useEventTracker(
  arg1: string | ActionEventMap,
  arg2?: ActionEventMap | EventTrackerRegisterOptions,
  arg3?: EventTrackerRegisterOptions
) {
  const eventTrackerContainerRef = useRef<any>(null);
  let element: Element;
  let actionEventMap: ActionEventMap;
  let options = arg3;

  if (typeof arg1 === "string" && isActionEventMap(arg2)) {
    const selectedElement = document.querySelector(arg1);
    if (selectedElement) {
      element = selectedElement;
    } else {
      Logger.error(`Element not found for selector: ${arg1}`);
    }
    actionEventMap = arg2!;
  } else if (isActionEventMap(arg1) && arg2) {
    element = eventTrackerContainerRef.current || document;
    actionEventMap = arg1;
  }

  useEffect(() => {
    const listener = (e: Event) => {
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
          `Event not found in the global event tracker: ${customEventPayload.eventName} on ${customEventPayload.action}`
        );
        return;
      }

      const payload =
        options?.modifier(customEventPayload.payload, customEventPayload.eventName, customEventPayload.action) ||
        customEventPayload.payload;

      eventCallback(payload, customEventPayload.eventName, customEventPayload.action);
    };

    element.addEventListener("eventracker", listener);

    return () => element.removeEventListener("eventracker", listener);
  }, [eventTrackerContainerRef]);

  if (typeof arg1 !== "string") {
    return eventTrackerContainerRef;
  }
}

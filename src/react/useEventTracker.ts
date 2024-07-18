import { useEffect, useRef, MutableRefObject, useLayoutEffect } from "react";
import { ActionEventMap, EventTrackerOptions } from "../models/type";
import { Logger } from "../utils/logger";
import { isActionEventMap } from "../utils/common";
import { subscribeEventTracker } from "../core/subscribeEventTracker";

/**
 * Custom hook for tracking events and executing callbacks based on the events.
 * Use typescript overload to accept two different types of arguments.
 * @param arg1 - Either a selector string or an ActionEventMap object.
 * @param arg2 - Optional ActionEventMap object.
 * @returns - If arg1 is a selector string, returns a ref to the event tracker container element. Otherwise, returns undefined.
 */
export function useEventTracker(actionEventMap: ActionEventMap, options?: EventTrackerOptions): MutableRefObject<any>;
export function useEventTracker(selector: string, actionEventMap: ActionEventMap, options?: EventTrackerOptions): void;
export function useEventTracker(
  arg1: string | ActionEventMap,
  arg2?: ActionEventMap | EventTrackerOptions,
  arg3?: EventTrackerOptions
) {
  const eventTrackerContainerRef = useRef<any>(null);
  let actionEventMap: ActionEventMap;
  let options: EventTrackerOptions | undefined;

  if (typeof arg1 === "string" && isActionEventMap(arg2)) {
    actionEventMap = arg2!;
    options = arg3;
  } else if (isActionEventMap(arg1)) {
    actionEventMap = arg1;
    options = arg2 as EventTrackerOptions;
  }

  useEffect(() => {
    if (!eventTrackerContainerRef.current) return;

    eventTrackerContainerRef.current?.addEventListener("eventracker", subscribeEventTracker(actionEventMap, options));
    Logger.subscribed(eventTrackerContainerRef.current.id);

    return () =>
      eventTrackerContainerRef.current?.removeEventListener(
        "eventracker",
        subscribeEventTracker(actionEventMap, options)
      );
  }, [eventTrackerContainerRef]);

  useLayoutEffect(() => {
    if (!eventTrackerContainerRef.current && typeof arg1 === "string") {
      const element = document.querySelector(arg1);

      if (element) {
        eventTrackerContainerRef.current = element;
      } else {
        Logger.error(`Element not found for selector: ${arg1}`);
      }
    }
  }, [arg1]);

  if (typeof arg1 !== "string") {
    return eventTrackerContainerRef;
  }
}

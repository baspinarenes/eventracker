import { useEffect, useRef } from "react";
import { EventAction } from "../../models/enum";

const addedRefs = new Set();

export function useEventTracker(
  callback: (action: `${EventAction}`, eventName: string) => void
) {
  const eventTrackerContainerRef = useRef<any>(null);

  useEffect(() => {
    const listener = (e: Event) => {
      e.stopPropagation();
      const { action, eventName } = (e as CustomEvent).detail;
      callback(action, eventName);
    };

    const element = eventTrackerContainerRef.current || document;
    element.addEventListener("eventracker", listener);
    addedRefs.add(eventTrackerContainerRef.current);

    return () => element.removeEventListener("eventracker", listener);
  }, [eventTrackerContainerRef]);

  return eventTrackerContainerRef;
}

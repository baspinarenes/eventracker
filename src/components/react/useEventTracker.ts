import { useEffect, useRef } from "react";
import { EventAction } from "../../models/enum";

export function useEventTracker(
  callback: (action: `${EventAction}`, eventName: string) => void
) {
  const eventTrackerContainerRef = useRef<any>(null);

  useEffect(() => {
    const element = eventTrackerContainerRef.current || document;

    const listener = (e: Event) => {
      e.stopPropagation();
      const { action, eventName } = (e as CustomEvent).detail;
      callback(action, eventName);
    };

    element.addEventListener("eventracker", listener);

    return () => element.removeEventListener("eventracker", listener);
  }, [eventTrackerContainerRef]);

  return eventTrackerContainerRef;
}

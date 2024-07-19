import { useEffect, useMemo, useRef, type FC } from "react";
import { generateActionEventMap } from "../utils/common";
import { TrackerListenerEvent } from "../core";
import { TrackerObserverEvent } from "../core/TrackerObserverEvent";
import { PropertiesOnly } from "../models/type";

export const EventTracker: FC<EventTrackerProps> = (props) => {
  const { children, action: actionProp, click, hover, seen, enabled = true } = props;
  const eventTrackerContainerRef = useRef<HTMLDivElement>(null);

  // Merge two different event props (actions or invidual).
  const action = useMemo(
    () => generateActionEventMap(actionProp, click, hover, seen),
    [actionProp, click, hover, seen]
  );

  // Subscribe all events to the container if it's enabled.
  useEffect(() => {
    console.log("EventTracker eventTrackerContainerRef", eventTrackerContainerRef);
    console.log("EventTracker action", action);
    if (!eventTrackerContainerRef.current) return;

    const unsubscribeAll = () => {
      action?.click?.unsubscribe(eventTrackerContainerRef.current!);
      action?.hover?.unsubscribe(eventTrackerContainerRef.current!);
      action?.seen?.unsubscribe(eventTrackerContainerRef.current!);
    };

    const subscribeAll = () => {
      action?.click?.subscribe(eventTrackerContainerRef.current!);
      action?.hover?.subscribe(eventTrackerContainerRef.current!);
      action?.seen?.subscribe(eventTrackerContainerRef.current!);
    };

    enabled ? subscribeAll() : unsubscribeAll();
    return () => unsubscribeAll();
  }, [enabled, eventTrackerContainerRef]);

  console.log("EventTracker rendered");

  return (
    <div ref={eventTrackerContainerRef} data-testid="event-tracker-container">
      <div>Test</div>
      {children}
    </div>
  );
};

export type EventTrackerProps = {
  children: React.ReactNode;
  enabled?: boolean;
  debug?: boolean;
  action?: {
    click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>;
  };
  click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
  hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
  seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>;
};

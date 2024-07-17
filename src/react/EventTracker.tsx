import { useEffect, useMemo, useRef, type FC } from "react";
import { generateActionsFromEventMap } from "../utils/common";
import { TrackerListenerEvent } from "../core";
import { TrackerObserverEvent } from "../core/TrackerObserverEvent";
import { PropertiesOnly } from "../models/type";

/**
 * EventTracker component tracks various events such as click, hover, and seen on its child components.
 * It provides the ability to enable/disable event tracking and debug mode.
 *
 * @component
 * @example
 * ```tsx
 * const actions = new TrackerActions({
 *  click: {
 *    eventName: "custom-click-event",
 *    payload: { key: "value" },
 *  },
 *  seen: {
 *    eventName: "custom-seen-event",
 *    payload: { key: "value" },
 *  },
 * });
 *
 * <EventTracker actions={actions}>
 *   <ChildComponent />
 * </EventTracker>
 * ```
 * @example
 * ```tsx
 * <EventTracker
 *  click={{
 *    eventName: "custom-click-event",
 *    payload: { key: "value" },
 *  }}
 *  seen={{
 *    eventName: "custom-seen-event",
 *    payload: { key: "value" },
 *  }}
 *  debug
 * >
 *   <ChildComponent />
 * </EventTracker>
 * ```
 */
export const EventTracker: FC<EventTrackerProps> = (props) => {
  const { children, actions: actionsProp, click, hover, seen, enabled = true, debug = false } = props;

  const eventTrackerContainerRef = useRef<HTMLDivElement>(null);

  // Merge two different event props (actions or invidual).
  const actions = useMemo(
    () => generateActionsFromEventMap(actionsProp, click, hover, seen),
    [actionsProp, click, hover, seen]
  );

  // Disable the global debug mode if the debug is
  // activated for spesific component.
  useEffect(() => {
    if (debug) {
      globalThis.eventracker.debug = false;
    }
  }, [debug]);

  // Subscribe all events to the container if it's enabled.
  useEffect(() => {
    if (!eventTrackerContainerRef.current) return;

    const unsubscribeAll = () => {
      actions?.click?.unsubscribe(eventTrackerContainerRef.current!);
      actions?.hover?.unsubscribe(eventTrackerContainerRef.current!);
      actions?.seen?.unsubscribe(eventTrackerContainerRef.current!);
    };

    const subscribeAll = () => {
      actions?.click?.subscribe(eventTrackerContainerRef.current!);
      actions?.hover?.subscribe(eventTrackerContainerRef.current!);
      actions?.seen?.subscribe(eventTrackerContainerRef.current!);
    };

    enabled ? subscribeAll() : unsubscribeAll();

    return () => unsubscribeAll();
  }, [enabled, eventTrackerContainerRef]);

  return (
    <div ref={eventTrackerContainerRef} data-testid="event-tracker-container">
      {children}
    </div>
  );
};

export type EventTrackerProps = {
  children: React.ReactNode;
  enabled?: boolean;
  debug?: boolean;
  actions?: {
    click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>;
  };
  click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
  hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
  seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>;
};

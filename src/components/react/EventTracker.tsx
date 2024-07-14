if (typeof window !== "undefined" && !globalThis.eventracker) {
  globalThis.eventracker = {
    debugMode: useStore.getState().debugMode, // TODO: set this to false in production
    summary: EventSubscription.summary,
    toggleDebug: () => {
      const value = !globalThis.eventracker.debugMode;
      globalThis.eventracker.debugMode = value;
      useStore.getState().setDebugMode(value);
    },
  };
}

import React, { useEffect, useId, useMemo, useRef } from "react";
import { EventTrackerProps } from "../../models/type";
import { EventSubscription } from "../../utils/event-subscription";
import { useStore } from "../../store";

export const EventTracker: React.FC<EventTrackerProps> = ({
  children,
  click,
  hover,
  enabled = true,
  eventTrackerContainerRef,
  ...props
}) => {
  const containerElRef = useRef<HTMLDivElement>(null);
  const generatedProps: React.HTMLAttributes<HTMLDivElement> = {};
  const uniqueId = useId();
  const eventSubscription = useMemo(
    () =>
      new EventSubscription(uniqueId, [
        click ? { action: "click", ...click } : undefined,
        hover ? { action: "hover", ...hover } : undefined,
      ]),
    []
  );

  useEffect(() => {
    if (!enabled) return;
    eventSubscription.setupListeners(eventTrackerContainerRef);
    useStore.subscribe(console.log);
    return () => eventSubscription.clearListeners();
  }, []);

  useEffect(() => {
    if (!enabled && eventSubscription.hasSubscription()) {
      eventSubscription.clearListeners();
    }
  }, [enabled]);

  return (
    <div
      id={uniqueId}
      ref={containerElRef}
      data-testid="fire-event"
      {...props}
      {...generatedProps}
    >
      {children}
    </div>
  );
};

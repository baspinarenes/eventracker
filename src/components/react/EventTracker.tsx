if (typeof window !== "undefined" && !globalThis.eventracker) {
  globalThis.eventracker = {
    debugMode: useEvenTrackerStore.getState().debugMode, // TODO: set this to false in production
    eventTargetShakerMode: useEvenTrackerStore.getState().eventTargetShakerMode,
    summary: EventSubscription.summary,
    toggleDebug: () => {
      const value = !globalThis.eventracker.debugMode;
      globalThis.eventracker.debugMode = value;
      useEvenTrackerStore.getState().setDebugMode(value);
    },
    toggleEventTargetShaker: () => {
      const value = !globalThis.eventracker.eventTargetShakerMode;
      globalThis.eventracker.eventTargetShakerMode = value;
      useEvenTrackerStore.getState().setEventerShaker(value);
    },
  };
}

import React, { useEffect, useId, useMemo, useRef } from "react";
import { EventTrackerProps } from "../../models/type";
import { EventSubscription } from "../../utils/event-subscription";
import { useEvenTrackerStore } from "../../store";
import { shakeAnimation } from "../../utils/animation";
import { useSeenObserver } from "./useSeenObserver";
import { dispatchCustomEvent } from "../../utils/custom-event";
import { EventTrackerAction } from "../../models/enum";

export const EventTracker: React.FC<EventTrackerProps> = ({
  children,
  click,
  hover,
  seen,
  enabled = true,
  ...props
}) => {
  const eventTrackerContainerElemenRef = useRef<HTMLDivElement>(null);
  const generatedProps: React.HTMLAttributes<HTMLDivElement> = {};
  const uniqueId = useId();
  const eventSubscription = useMemo(
    () =>
      new EventSubscription(uniqueId, [
        click ? { ...click, action: "click" } : undefined,
        hover ? { ...hover, action: "hover" } : undefined,
      ]),
    []
  );

  useEffect(() => {
    if (!enabled || !eventTrackerContainerElemenRef.current) return;

    eventSubscription.setupListeners(
      eventTrackerContainerElemenRef.current,
      shakeAnimation
    );

    return () => eventSubscription.clearListeners();
  }, []);

  useEffect(() => {
    if (!enabled && eventSubscription.hasSubscription()) {
      eventSubscription.clearListeners();
    }
  }, [enabled]);

  useSeenObserver({
    ref: eventTrackerContainerElemenRef,
    enabled: typeof seen !== "undefined",
    handler: () => {
      shakeAnimation(eventTrackerContainerElemenRef.current!);

      dispatchCustomEvent(
        {
          action: EventTrackerAction.SEEN,
          eventName: seen!.eventName,
          onlyOnce: seen!.onlyOnce,
        },
        eventTrackerContainerElemenRef.current!
      );
    },
  });

  return (
    <div
      id={uniqueId}
      ref={eventTrackerContainerElemenRef}
      data-testid="fire-event"
      {...props}
      {...generatedProps}
    >
      {children}
    </div>
  );
};

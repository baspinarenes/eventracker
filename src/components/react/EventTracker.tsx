import React, { useEffect, useId, useMemo, useRef } from "react";
import { EventTrackerProps } from "../../models/type";
import { EventSubscription } from "../../utils/event-subscription";
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

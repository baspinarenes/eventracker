import { TrackerActions, TrackerListenerEvent } from "../core";
import { Logger } from "./logger";
import { playShakeAnimation } from "./animation";
import { TrackerObserverEvent } from "../core/TrackerObserverEvent";
import { PropertiesOnly } from "../models/type";

export function getSafeValue(initializer: () => any, defaultValue: any) {
  try {
    const value = initializer();
    return value ?? defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

export function isDebugMode() {
  return globalThis.eventracker.debug;
}

export function isShakeTriggeredComponentMode() {
  return globalThis.eventracker.shakeTriggeredComponent;
}

/**
 * Dispatches a custom event to the specified event tracker container.
 * @param event - The event to dispatch.
 * @param eventTrackerContainer - The container to dispatch the event to.
 */
export function dispatchCustomEvent(
  event: TrackerListenerEvent | TrackerObserverEvent,
  eventTrackerContainer: HTMLElement
) {
  Logger.triggered(event.action, event.eventName);
  const { action, eventName, onlyOnce, ...payload } = event;

  const eventTrackerEvent = new CustomEvent(`eventracker`, {
    bubbles: true,
    detail: {
      action,
      eventName,
      payload,
    },
  });

  eventTrackerContainer.dispatchEvent(eventTrackerEvent);
  playShakeAnimation(eventTrackerContainer);
}

/**
 * Generates TrackerActions object from the given actions and event data.
 * @param actions - Optional object containing click, hover, and seen event data.
 * @param click - Optional click event data.
 * @param hover - Optional hover event data.
 * @param seen - Optional seen event data.
 * @returns The generated TrackerActions object.
 */
export function generateActionsFromEventMap(
  actions?: {
    click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>;
  },
  click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>,
  hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>,
  seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>
): TrackerActions {
  const givenClick = actions?.click || click;
  const givenHover = actions?.hover || hover;
  const givenSeen = actions?.seen || seen;

  const clickAction = givenClick ? new TrackerListenerEvent({ ...givenClick, action: "click" }) : undefined;

  const hoverAction = givenHover ? new TrackerListenerEvent({ ...givenHover, action: "hover" }) : undefined;

  const seenAction = givenSeen ? new TrackerObserverEvent({ ...givenSeen, action: "seen" }) : undefined;

  return new TrackerActions({
    click: clickAction,
    hover: hoverAction,
    seen: seenAction,
  });
}

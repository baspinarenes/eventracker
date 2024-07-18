import { TrackerAction, TrackerListenerEvent } from "../core";
import { Logger } from "./logger";
import { playShakeAnimation } from "./animation";
import { TrackerObserverEvent } from "../core/TrackerObserverEvent";
import { ActionEventMap, Configuration, PropertiesOnly } from "../models/type";

export function getSafeValue(initializer: () => any, defaultValue: any) {
  try {
    const value = initializer();
    return value ?? defaultValue;
  } catch (err) {
    return defaultValue;
  }
}

export function getConfiguration(): Configuration {
  return globalThis.eventracker;
}

export function isActionEventMap(arg: any): arg is ActionEventMap {
  return arg.click || arg.hover || arg.seen;
}

/**
 * Dispatches a custom event to the specified event tracker container.
 * @param event - The event to dispatch.
 * @param eventTrackerContainer - The container to dispatch the event to.
 */
export function dispatchCustomEvent(
  event: TrackerListenerEvent | TrackerObserverEvent,
  eventTrackerContainer: HTMLElement,
  callback?: () => void
) {
  Logger.triggered(event.action, event.eventName, event.payload);
  const { action, eventName, once, payload } = event;

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

  if (once) {
    callback && callback();
  }
}

/**
 * Generates TrackerAction object from the given action and event data.
 * @param action - Optional object containing click, hover, and seen event data.
 * @param click - Optional click event data.
 * @param hover - Optional hover event data.
 * @param seen - Optional seen event data.
 * @returns The generated TrackerAction object.
 */
export function generateActionEventMap(
  action?: {
    click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>;
  },
  click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>,
  hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>,
  seen?: PropertiesOnly<Omit<TrackerObserverEvent, "action">>
): TrackerAction {
  const givenClick = action?.click || click;
  const givenHover = action?.hover || hover;
  const givenSeen = action?.seen || seen;

  const clickAction = givenClick ? new TrackerListenerEvent({ ...givenClick, action: "click" }) : undefined;

  const hoverAction = givenHover ? new TrackerListenerEvent({ ...givenHover, action: "hover" }) : undefined;

  const seenAction = givenSeen ? new TrackerObserverEvent({ ...givenSeen, action: "seen" }) : undefined;

  return new TrackerAction({
    click: clickAction,
    hover: hoverAction,
    seen: seenAction,
  });
}

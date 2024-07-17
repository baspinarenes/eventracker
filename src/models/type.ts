import { TrackerListenerEvent } from "../core";
import { TrackerObserverEvent } from "../core/TrackerObserverEvent";

declare global {
  var eventracker: {
    debug: boolean;
    shakeTriggeredComponent: boolean;
    toggleDebug: () => void;
    toggleEventTargetShaker: () => void;
  };
}

export type ClassProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type PropertiesOnly<T> = Pick<T, ClassProperties<T>>;

export type EventAction = "click" | "hover" | "seen";

export type EventPayload = Record<string, unknown>;
export type EventMap = Partial<
  Record<EventAction, TrackerListenerEvent | TrackerObserverEvent>
>;

export type CallbackPayload = {
  action: EventAction;
  eventName: string;
  payload: EventPayload;
};

export type ActionEventMap = Partial<
  Record<
    EventAction,
    Record<
      string,
      (
        payload: Record<string, unknown>,
        eventName: string,
        action: EventAction
      ) => void
    >
  >
>;

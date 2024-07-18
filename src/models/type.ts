import { TrackerListenerEvent } from "../core";
import { TrackerObserverEvent } from "../core/TrackerObserverEvent";

declare global {
  var eventracker: {
    summary: Record<EventAction, Record<string, { triggered: number; callback?: () => void }>>;
    toggleDebug: () => void;
    summarize: () => void;
    saveEventToSummary: (action: EventAction, eventName: string, callback: () => void) => void;
    removeEventFromSummary: (action: EventAction, eventName: string) => void;
    increaseFireCountOnSummary: (action: EventAction, eventName: string) => void;
  } & Configuration;
}

export type ClassProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type PropertiesOnly<T> = Pick<T, ClassProperties<T>>;

export type EventAction = "click" | "hover" | "seen";

export type EventPayload = Record<string, unknown>;
export type EventMap = Partial<Record<EventAction, TrackerListenerEvent | TrackerObserverEvent>>;

export type CallbackPayload = {
  action: EventAction;
  eventName: string;
  payload: EventPayload;
};

export type ActionEventMap = Partial<
  Record<
    EventAction,
    Record<string, (payload: Record<string, unknown>, eventName: string, action: EventAction) => void>
  >
>;

export type EventTrackerOptions = {
  payloadModifier?: (payload: EventPayload, eventName: string, action: EventAction) => Record<string, unknown>;
};

export type Configuration = {
  debugMode: {
    enabled: boolean;
    output: "console";
    animation?: "shake";
    style?: {
      registered: string;
      subscribed: string;
      unsubscribed: string;
      triggered: string;
      modified: string;
    };
  };
  payloadModifier?: (payload: EventPayload, eventName: string, action: EventAction) => EventPayload;
};

import { EventAction } from "./enum";

declare global {
  var eventracker: {
    debugMode: boolean;
    eventTargetShakerMode: boolean;
    summary: () => void;
    toggleDebug: () => void;
    toggleEventTargetShaker: () => void;
  };
}

export type ObserveActionData = {
  action?: "seen";
  eventName: string;
  onlyOnce?: boolean;
} & Record<string, unknown>;

export type SubscribeActionData = {
  action?: "click" | "hover";
  eventName: string;
  onlyOnce?: boolean;
} & Record<string, unknown>;

export type EventTrackerProps = {
  children: React.ReactNode;
  name?: string;
  onlyOnce?: boolean;
  enabled?: boolean;
  debug?: boolean;
  click?: SubscribeActionData;
  hover?: SubscribeActionData;
  seen?: ObserveActionData;
};
// & HTMLAttributes<HTMLDivElement>;

export type EventListenerClassType = Record<
  EventAction,
  {
    subscribe: () => void;
    unsubscribe: () => void;
  }
>;

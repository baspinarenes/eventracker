import { EventAction } from "./enum";
import type { HTMLAttributes } from "react";

declare global {
  var eventracker: {
    debugMode: boolean;
    summary: () => void;
    toggleDebug: () => void;
  };
}

type AtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T
  ? Partial<T> & Pick<T, K>
  : never;

export type EventActionData = Record<string, unknown> & {
  eventName: string;
  onlyOnce?: boolean;
};

export type EventActionDataWithAction = Record<string, unknown> & {
  action: `${EventAction}`;
  eventName: string;
  onlyOnce?: boolean;
};

export type FireEventProps = {
  children: React.ReactNode;
  name?: string;
  onlyOnce?: boolean;
  enabled?: boolean;
  debug?: boolean;
} & AtLeastOne<Record<`${EventAction}`, EventActionData>> &
  HTMLAttributes<HTMLDivElement>;

export type EventListenerClassType = Record<
  EventAction,
  {
    subscribe: () => void;
    unsubscribe: () => void;
  }
>;

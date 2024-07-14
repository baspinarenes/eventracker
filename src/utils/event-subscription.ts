import { EventAction, NativeEvent } from "../models/enum";
import { EventActionDataWithAction } from "../models/type";
import { useStore } from "../store";
import { CustomEvent } from "./custom-event";
import { Logger } from "./logger";

export class EventSubscription {
  static allSubscriptions: Record<EventAction, Record<string, any>> = {
    click: {},
    hover: {},
  };

  private uniqueId: string;
  private eventDefinations: EventActionDataWithAction[] = [];
  private subscriptions: Record<EventAction, Record<string, any>> = {
    click: {},
    hover: {},
  };

  constructor(
    uniqueId: string,
    eventDefinations?: (EventActionDataWithAction | undefined)[]
  ) {
    this.uniqueId = uniqueId;
    this.eventDefinations =
      eventDefinations?.filter((d) => typeof d !== "undefined") ?? [];
  }

  subscribe(
    action: `${EventAction}`,
    eventName: string,
    onlyOnce: boolean,
    callback: (e: Event) => void
  ) {
    if (this.hasSubscription(action, eventName)) {
      throw Error("Bu isimde bir event mevcut.");
    }

    Logger.subscribed(action, eventName);
    this.subscriptions[action][eventName] = callback;
    EventSubscription.allSubscriptions[action][eventName] = callback;
    document.getElementById(this.uniqueId)?.addEventListener(
      NativeEvent[action],
      (e) => {
        callback(e);
        if (onlyOnce) Logger.unsubscribed(action, eventName);
      },
      {
        once: onlyOnce,
      }
    );
  }

  unsubscribe(action: `${EventAction}`, eventName: string) {
    if (!this.hasSubscription(action, eventName)) {
      console.error(
        `[eventracker] "${action}:${eventName}" event tanımlı değil.`
      );
    }

    Logger.unsubscribed(action, eventName);
    document
      .getElementById(this.uniqueId)
      ?.removeEventListener(
        NativeEvent[action],
        this.subscriptions[action][eventName]
      );
    delete this.subscriptions[action][eventName];
    delete EventSubscription.allSubscriptions[action][eventName];
  }

  // static unsubscribe(element: action: `${EventAction}`, eventName: string) {

  // }

  setupListeners() {
    this.eventDefinations.forEach((eventData) => {
      if (eventData) {
        this.subscribe(
          eventData.action,
          eventData.eventName,
          eventData.onlyOnce || false,
          () => CustomEvent[eventData.action](eventData.eventName)
        );
      }
    });
  }

  clearListeners() {
    const actions = Object.keys(this.subscriptions) as `${EventAction}`[];
    actions.forEach((action) => {
      Object.keys(this.subscriptions[action]).forEach((eventName) => {
        this.unsubscribe(action, eventName);
      });

      this.subscriptions[action] = {};
    });
  }

  static clearAllSubscriptionsForAction(action: EventAction) {
    // TODO: implement
    console.log("action", action);
  }

  hasSubscription(action?: `${EventAction}`, eventName?: string) {
    if (!action || !eventName) {
      return !!this.eventDefinations.length;
    }

    return !!this.subscriptions[action][eventName];
  }

  static summary() {
    Logger.info(`subscriptions`, EventSubscription.allSubscriptions);
  }
}

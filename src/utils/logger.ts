import { EventAction, EventPayload } from "../models/type";
import { getConfiguration } from "./common";

export class Logger {
  private static messagePrefix = "[eventracker]";

  static subscribed(eventTrackerName: string) {
    this.debug(`${eventTrackerName} event tracker subscribed!`, {
      color: getConfiguration().debugMode.style!.subscribed,
    });
  }

  static unsubscribed(action: EventAction, eventName: string) {
    this.debug(`${action}:${eventName} unsubscribed.`, {
      color: getConfiguration().debugMode.style!.unsubscribed,
    });
  }

  static triggered(action: EventAction, eventName: string, payload?: EventPayload) {
    this.debug(`${action}:${eventName} triggered:`, {
      data: payload,
      color: getConfiguration().debugMode.style!.triggered,
    });
  }

  static registered(action: EventAction, eventName: string) {
    this.debug(`${action ? `${action}:` : ""}${eventName} registered!`, {
      color: getConfiguration().debugMode.style!.registered,
    });
  }

  static modified(action: EventAction, eventName: string, payload: EventPayload, isGlobalPayloadModifier?: boolean) {
    this.debug(`${action}:${eventName} payload modified${isGlobalPayloadModifier ? " by global modifier" : ""}:`, {
      data: payload,
      color: getConfiguration().debugMode.style!.modified,
    });
  }

  static info(message: string, data?: any) {
    this.message(message, { data, color: "#ffcc00" });
  }

  static error(message: string, data?: any) {
    this.message(message, { data, color: "red" });
  }

  private static debug(message: string, options: { data?: any; color: string } = { color: "yellow" }) {
    if (!getConfiguration().debugMode.enabled) return;
    this.message(message, options);
  }

  private static message(message: string, options: { data?: any; color: string } = { color: "yellow" }) {
    console.log(`%c${this.messagePrefix} ${message}`, `color: ${options.color}`, options.data || "");
  }
}

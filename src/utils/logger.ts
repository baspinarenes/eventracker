import { EventAction } from "../models/type";
import { isDebugMode } from "./common";

export class Logger {
  private static messagePrefix = "[eventracker]";

  static subscribed(action: EventAction, eventName: string) {
    this.debug(`${action}:${eventName} subscribed.`);
  }

  static unsubscribed(action: EventAction, eventName: string) {
    this.debug(`${action}:${eventName} unsubscribed.`, {
      color: "red",
    });
  }

  static triggered(action: EventAction, eventName: string) {
    this.debug(`${action}:${eventName} triggered!`, {
      color: "#09a2ec",
    });
  }

  static info(message: string, data?: any) {
    this.message(message, { data, color: "#ffcc00" });
  }

  static error(message: string, data?: any) {
    this.message(message, { data, color: "red" });
  }

  private static debug(message: string, options: { data?: any; color: string } = { color: "yellow" }) {
    if (!isDebugMode()) return;
    this.message(message, options);
  }

  private static message(message: string, options: { data?: any; color: string } = { color: "yellow" }) {
    console.log(`%c${this.messagePrefix} ${message}`, `color: ${options.color}`, options.data || "");
  }
}

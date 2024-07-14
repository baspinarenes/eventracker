import { EventAction, EventTrackerAction } from "../models/enum";
import { useEvenTrackerStore } from "../store";

export class Logger {
  private static messagePrefix = "[eventracker]:";

  static subscribed(action: `${EventAction}`, eventName: string) {
    this.debug(`${action}:${eventName} subscribed.`);
  }

  static unsubscribed(action: `${EventAction}`, eventName: string) {
    this.debug(`${action}:${eventName} unsubscribed.`, {
      color: "red",
    });
  }

  static triggered(action: `${EventTrackerAction}`, eventName: string) {
    this.debug(`${action}:${eventName} triggered!`, {
      color: "#09a2ec",
    });
  }

  static info(message: string, data?: any) {
    this.message(message, { data, color: "#ffcc00" });
  }

  private static debug(
    message: string,
    options: { data?: any; color: string } = { color: "yellow" }
  ) {
    if (!useEvenTrackerStore.getState().debugMode) return;
    this.message(message, options);
  }

  private static message(
    message: string,
    options: { data?: any; color: string } = { color: "yellow" }
  ) {
    console.log(
      `%c${this.messagePrefix} ${message}`,
      `color: ${options.color}`,
      options.data || ""
    );
  }
}

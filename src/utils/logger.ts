import { EventAction, EventPayload } from "../models/type";
import { getConfiguration } from "./common";
import Toastify from "toastify-js";
import "../../node_modules/toastify-js/src/toastify.css";

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

    if (getConfiguration().debugMode.output.includes("console")) {
      this.message(message, options);
    }

    if (getConfiguration().debugMode.output.includes("toast")) {
      Toastify({
        text: `${message}\n${options.data ? JSON.stringify(options.data) : ""}`,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        duration: 2000,
        style: {
          position: "fixed",
          right: "10px",
          top: "10px",
          padding: "10px",
          "box-shadow": "0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3)",
          transition: "all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)",
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          "border-radius": "4px",
          color: "white",
          opacity: "0.8",
        },
      }).showToast();
    }
  }

  private static message(message: string, options: { data?: any; color: string } = { color: "yellow" }) {
    console.log(`%c${this.messagePrefix} ${message}`, `color: ${options.color}`, options.data || "");
  }
}

import { ObserveActionData, SubscribeActionData } from "../models/type";
import { Logger } from "./logger";

export function dispatchCustomEvent(
  eventData: SubscribeActionData | ObserveActionData,
  dispatchElRef: HTMLElement
) {
  Logger.triggered(eventData.action!, eventData.eventName);
  const { action, eventName, onlyOnce, ...payload } = eventData;

  const event = new CustomEvent(`eventracker`, {
    bubbles: true,
    detail: {
      action,
      eventName,
      payload,
    },
  });

  dispatchElRef.dispatchEvent(event);
}

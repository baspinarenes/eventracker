import { Logger } from "./logger";

export class CustomTrackerEvent {
  static click(
    eventName: string,
    eventTrackerContainerRef?: React.RefObject<HTMLElement>
  ) {
    Logger.triggered("click", eventName);
    const event = new CustomEvent(`eventracker`, {
      bubbles: true,
      detail: {
        action: "click",
        eventName,
      },
    });
    // TODO: add error handling
    const element = eventTrackerContainerRef?.current || document;
    element.dispatchEvent(event);
  }

  static hover(
    eventName: string,
    eventTrackerContainerRef?: React.RefObject<HTMLElement>
  ) {
    Logger.triggered("hover", eventName);

    const event = new CustomEvent(`eventracker`, {
      bubbles: true,
      detail: {
        action: "hover",
        eventName,
      },
    });

    const element = eventTrackerContainerRef?.current || document;
    element.dispatchEvent(event);
  }
}

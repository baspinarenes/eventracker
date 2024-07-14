import { Logger } from "./logger";

export class CustomEvent {
  static click(eventName: string = "") {
    Logger.triggered("click", eventName);
  }

  static hover(eventName: string = "") {
    Logger.triggered("hover", eventName);
  }
}

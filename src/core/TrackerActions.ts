import { PropertiesOnly } from "../models/type";
import { TrackerListenerEvent } from "./TrackerListenerEvent";
import { TrackerObserverEvent } from "./TrackerObserverEvent";

export class TrackerActions {
  public click?: TrackerListenerEvent;
  public hover?: TrackerListenerEvent;
  public seen?: TrackerObserverEvent;

  constructor({
    click,
    hover,
    seen,
  }: {
    click?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    hover?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
    seen?: PropertiesOnly<Omit<TrackerListenerEvent, "action">>;
  }) {
    this.click = click
      ? new TrackerListenerEvent({ ...click, action: "click" })
      : undefined;
    this.hover = hover
      ? new TrackerListenerEvent({ ...hover, action: "hover" })
      : undefined;
    this.seen = seen
      ? new TrackerObserverEvent({ ...seen, action: "seen" })
      : undefined;
  }
}

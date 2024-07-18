import { EventAction } from "../models/type";

export function initializeEventTrackerForGlobal() {
  if (globalThis.eventracker) {
    return;
  }

  globalThis.eventracker = {
    debugMode: {
      enabled: false,
      output: "console",
      style: {
        registered: "yellow",
        subscribed: "green",
        unsubscribed: "red",
        triggered: "orange",
        modified: "gray",
      },
    },

    summary: {
      click: {},
      hover: {},
      seen: {},
    },

    toggleDebug: () => {
      globalThis.eventracker.debugMode.enabled = !globalThis.eventracker.debugMode.enabled;
    },

    saveEventToSummary: (action: EventAction, eventName: string, callback: () => void) => {
      globalThis.eventracker.summary[action][eventName] = {
        callback,
        triggered: 0,
      };
      console.log("globalThis.eventracker.summary", globalThis.eventracker.summary);
    },

    removeEventFromSummary: (action: EventAction, eventName: string) => {
      delete globalThis.eventracker.summary[action][eventName].callback;
    },

    increaseFireCountOnSummary: (action: EventAction, eventName: string) => {
      globalThis.eventracker.summary[action][eventName].triggered += 1;
    },

    summarize: (action?: EventAction, eventName?: string) => {
      console.log("Summarize:");

      if (action && eventName) {
        console.log(globalThis.eventracker.summary[action][eventName]);
      } else if (action) {
        console.log(globalThis.eventracker.summary[action]);
      } else {
        console.log(globalThis.eventracker.summary);
      }
    },
  };
}

import { useEvenTrackerStore } from "./store";
import { EventSubscription } from "./utils/event-subscription";

export * from "./components/react/EventTracker";
export * from "./components/react/useEventTracker";

if (typeof window !== "undefined" && !globalThis.eventracker) {
  globalThis.eventracker = {
    debugMode: useEvenTrackerStore.getState().debugMode, // TODO: set this to false in production
    eventTargetShakerMode: useEvenTrackerStore.getState().eventTargetShakerMode,
    summary: EventSubscription.summary,
    toggleDebug: () => {
      const value = !globalThis.eventracker.debugMode;
      globalThis.eventracker.debugMode = value;
      useEvenTrackerStore.getState().setDebugMode(value);
    },
    toggleEventTargetShaker: () => {
      const value = !globalThis.eventracker.eventTargetShakerMode;
      globalThis.eventracker.eventTargetShakerMode = value;
      useEvenTrackerStore.getState().setEventerShaker(value);
    },
  };
}

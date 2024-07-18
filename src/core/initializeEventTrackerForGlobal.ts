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

    toggleDebug: () => {
      globalThis.eventracker.debugMode.enabled = !globalThis.eventracker.debugMode.enabled;
    },
  };
}

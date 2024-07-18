/**
 * Initializes the event tracker for the global scope.
 * If the event tracker is already initialized, this function does nothing.
 */
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

    /**
     * Toggles the debug mode of the event tracker.
     * If debug mode is enabled, additional logging and debugging information will be displayed.
     */
    toggleDebug: () => {
      globalThis.eventracker.debugMode.enabled = !globalThis.eventracker.debugMode.enabled;
    },
  };
}

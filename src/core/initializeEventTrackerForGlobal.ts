/**
 * Initializes the event tracker for the global scope.
 * If the event tracker is already initialized, this function does nothing.
 */
export function initializeEventTrackerForGlobal() {
  if (globalThis.eventracker) {
    return;
  }

  globalThis.eventracker = {
    debug: false,
    shakeTriggeredComponent: false,

    /**
     * Toggles the debug mode of the event tracker.
     * If debug mode is enabled, additional logging and debugging information will be displayed.
     */
    toggleDebug: () => {
      globalThis.eventracker.debug = !globalThis.eventracker.debug;
    },

    /**
     * Toggles the event target shaker of the event tracker.
     * If the event target shaker is enabled, the component associated with the triggered event will shake.
     */
    toggleEventTargetShaker: () => {
      globalThis.eventracker.shakeTriggeredComponent = !globalThis.eventracker.shakeTriggeredComponent;
    },
  };
}

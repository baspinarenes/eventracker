import type { Configuration } from "../models/type";

export function configureEventTracker(configuration: Configuration) {
  globalThis.eventracker = {
    ...globalThis.eventracker,
    debugMode: {
      ...globalThis.eventracker.debugMode,
      ...configuration.debugMode,
    },
    payloadModifier: configuration.payloadModifier,
  };
}

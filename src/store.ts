import { create } from "zustand";
import { EventAction } from "./models/enum";

type EventKey = `${EventAction}:${string}`;

interface EvenTrackerStore {
  triggerCount: Record<EventKey, number>;
  debugMode: boolean;
  eventTargetShakerMode: boolean;
  setDebugMode: (value: boolean) => void;
  setEventerShaker: (value: boolean) => void;
  clearEventKey: (eventKey: EventKey) => void;
  increaseTriggerCount: (eventKey: EventKey) => void;
}

export const useEvenTrackerStore = create<EvenTrackerStore>()((set) => ({
  debugMode: false,
  eventTargetShakerMode: false,
  triggerCount: {},
  setDebugMode: (value) => {
    set({ debugMode: value });
  },
  setEventerShaker: (value) => {
    set({ eventTargetShakerMode: value });
  },
  clearEventKey: (eventKey) => {
    set((state) => {
      delete state.triggerCount[eventKey];
      return state;
    });
  },
  increaseTriggerCount: (eventKey) => {
    set((state) => ({
      triggerCount: {
        ...state.triggerCount,
        [eventKey]: (state.triggerCount[eventKey] ?? 0) + 1,
      },
    }));
  },
}));

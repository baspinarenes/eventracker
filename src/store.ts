import { create } from "zustand";
import { EventAction } from "./models/enum";

type EventKey = `${EventAction}:${string}`;

interface Store {
  triggerCount: Record<EventKey, number>;
  debugMode: boolean;
  setDebugMode: (value: boolean) => void;
  clearEventKey: (eventKey: EventKey) => void;
  increaseTriggerCount: (eventKey: EventKey) => void;
}

export const useStore = create<Store>()((set) => ({
  debugMode: true,
  setDebugMode: (value) => {
    set({ debugMode: value });
  },
  triggerCount: {},
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

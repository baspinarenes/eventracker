export function registerEventTracker(
  eventTrackerRootId: string,
  callback: (action: string, eventName: string, payload: any) => void
) {
  document.addEventListener("DOMContentLoaded", () => {
    const element = document.querySelector(eventTrackerRootId);

    if (element) {
      element.addEventListener("eventracker", (e) => {
        console.log("eventrackereventrackereventracker");
        e.stopPropagation();
        const { action, eventName, payload } = (e as CustomEvent).detail;
        callback(action, eventName, payload);
      });
    }
  });
}

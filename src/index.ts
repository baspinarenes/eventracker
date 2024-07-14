export function registerEventTracker(
  eventTrackerRootId: string,
  callback: (action: string, eventName: string, payload: any) => void
) {
  console.log("asdasdasdsa");
  document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById(eventTrackerRootId);

    if (element) {
      element.addEventListener("eventracker", (e) => {
        e.stopPropagation();
        const { action, eventName, payload } = (e as CustomEvent).detail;
        callback(action, eventName, payload);
      });
    }
  });
}

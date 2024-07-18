import { EventTracker, useEventTracker } from "../../../dist/react";

export function Example3() {
  useEventTracker("#example-3", {
    click: {
      "custom-event-for-global-tracker": (payload) => {
        console.log("Event catched in example 3 subscriber:", payload);
      },
    },
  });

  return (
    <div id="example-3">
      <EventTracker
        click={{
          eventName: "custom-event-for-global-tracker",
          payload: {},
        }}
      >
        <button>Fire Event</button>
      </EventTracker>
    </div>
  );
}

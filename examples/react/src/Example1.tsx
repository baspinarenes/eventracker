import { EventTracker, useEventTracker } from "../../../dist/react";

// Basic - Click

export function Example1() {
  const ref = useEventTracker({
    click: {
      "custom-event-name-1": (payload) => {
        console.log("Event catched in example 1 subscriber:", payload);
      },
    },
  });

  return (
    <div id="xxx" ref={ref}>
      <EventTracker
        click={{
          eventName: "custom-event-name-1",
          payload: {},
          once: true,
        }}
      >
        <button>Fire Event</button>
      </EventTracker>
    </div>
  );
}

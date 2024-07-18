import { EventTracker, useEventTracker } from "../../../dist/react";

// Basic

export function Example2() {
  useEventTracker(
    "#example-2",
    {
      click: {
        "custom-event-name-2": (payload) => {
          console.log("Event catched in example 2 subscriber:", payload);
        },
      },
    },
    {
      payloadModifier: (payload) => {
        console.log("payloadpayloadpayload", payload);
        return {
          ...payload,
          b: "hhahahaha",
        };
      },
    }
  );

  return (
    <div id="example-2">
      <EventTracker
        click={{
          eventName: "custom-event-name-2",
          payload: { a: 1 },
        }}
      >
        <button>Fire Event</button>
      </EventTracker>
    </div>
  );
}

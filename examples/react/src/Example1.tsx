// Basic - Click

import { createPayload } from "../../../dist";
import { EventTracker, useEventTracker } from "../../../dist/react";

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
          payload: createPayload(({ cookie, sessionStore, localStore }) => ({
            key: "value",
            key2: cookie("token", { json: true, default: {} }),
            key3: sessionStore("asd", { json: true, default: {} }),
            key4: localStore("asd"),
          })),
          limit: 3,
        }}
      >
        <button>Fire Event</button>
      </EventTracker>
    </div>
  );
}

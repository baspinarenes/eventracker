import ReactDOM from "react-dom/client";
import { EventTracker } from "./react";

function Main() {
  return (
    <EventTracker
      click={{
        eventName: "data-custom-click",
        asda: 5,
      }}
    >
      <button>Fire Event</button>
    </EventTracker>
  );
}

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <Main />
);

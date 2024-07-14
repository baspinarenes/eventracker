import ReactDOM from "react-dom/client";
import { FireEvent } from "./react";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <FireEvent
    click={{
      eventName: "data-custom-click",
      asda: 5,
    }}
  >
    <button>Fire Event</button>
  </FireEvent>
);

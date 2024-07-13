import React from "react";
import ReactDOM from "react-dom/client";
import { FireEvent } from "./react";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <FireEvent>
      <button onClick={() => console.log("Clicked button. Event will fire.")}>
        Fire Event
      </button>
    </FireEvent>
  </React.StrictMode>
);

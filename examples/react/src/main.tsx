import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { configureEventTracker } from "../../../dist/index";

configureEventTracker({
  debugMode: {
    enabled: true,
    output: "console",
    animation: "shake",
  },
  payloadModifier: (payload) => {
    return {
      ...payload,
      zazaza: 5,
    };
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

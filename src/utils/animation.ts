import { useEvenTrackerStore } from "../store";

export function shakeAnimation(element: HTMLElement | null) {
  if (!element || !useEvenTrackerStore.getState().eventTargetShakerMode) return;
  const keyframes = [
    { transform: "translateX(0)" },
    { transform: "translateX(-20px)" },
    { transform: "translateX(20px)" },
    { transform: "translateX(-20px)" },
    { transform: "translateX(20px)" },
    { transform: "translateX(0)" },
  ];

  const options = {
    duration: 820,
    easing: "cubic-bezier(.36,.07,.19,.97)",
    iterations: 1,
  };

  element.animate(keyframes, options);
}

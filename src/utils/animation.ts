import { getConfiguration } from "./common";

export function playShakeAnimation(container: HTMLElement) {
  if (!container || !getConfiguration().debugMode.animation) return;

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

  container.animate(keyframes, options);
}

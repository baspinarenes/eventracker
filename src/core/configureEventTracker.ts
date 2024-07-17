export function configureEventTracker({
  debug,
  shakeTriggeredComponent,
}: {
  debug: boolean;
  shakeTriggeredComponent: boolean;
}) {
  globalThis.eventracker = {
    ...globalThis.eventracker,
    debug,
    shakeTriggeredComponent,
  };
}

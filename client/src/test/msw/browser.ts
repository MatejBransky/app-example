import { setupWorker } from "msw";
import type { Config } from "~/config";
import { initAutoHandlers, initManualHandlers } from "./handlers";

// This configures a Service Worker with the given request handlers.
export const initMock = (devConfig: Config) => {
  const { handlers: manualHandlers } = initManualHandlers(devConfig);
  const { handlers: autoHandlers } = initAutoHandlers(devConfig);

  return {
    worker: setupWorker(...autoHandlers, ...manualHandlers),
  };
};

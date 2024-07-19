type StorageHandler<T = any> = (key: string, options?: { json: boolean; default: T }) => T;

interface CreatePayloadCallback {
  ({
    cookie,
    sessionStore,
    localStore,
    safe,
  }: {
    cookie: StorageHandler;
    sessionStore: StorageHandler;
    localStore: StorageHandler;
    safe<T>(val: () => T, defaultValue: T): T;
  }): Record<string, any>;
}

function safe<T>(val: () => T, defaultValue: T): T {
  try {
    return val() || defaultValue;
  } catch (error) {
    console.error("Error caught in safe function:", error);
    return defaultValue;
  }
}

export function createPayload(callback: CreatePayloadCallback): Record<string, any> {
  const cookieHandler: StorageHandler = (key, options) => {
    try {
      const cookies = document.cookie.split("; ").reduce((acc, current) => {
        const [key, value] = current.split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const value = cookies[key];

      if (options?.json) return JSON.parse(value);

      return value;
    } catch (error) {
      return options?.default;
    }
  };

  const sessionStorageHandler: StorageHandler = (key, options) => {
    try {
      const value = sessionStorage.getItem(key);

      if (typeof value === "undefined" || value === null) {
        return options?.default;
      }

      if (options?.json) return JSON.parse(value);

      return value;
    } catch (error) {
      return options?.default;
    }
  };

  const localStorageHandler: StorageHandler = (key, options) => {
    try {
      const value = localStorage.getItem(key);

      if (typeof value === "undefined" || value === null) {
        return options?.default;
      }

      if (options?.json) return JSON.parse(value);

      return value;
    } catch (error) {
      return options?.default;
    }
  };

  return callback({
    cookie: cookieHandler,
    sessionStore: sessionStorageHandler,
    localStore: localStorageHandler,
    safe,
  });
}

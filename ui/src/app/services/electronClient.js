function getGlobalLauncherApi() {
  if (typeof window === 'undefined') return null;

  return window.api ?? window['dev.indigo.launcher'] ?? null;
}

function makeSafeCall(method, fallback) {
  return async (...args) => {
    const api = getGlobalLauncherApi();
    const fn = api?.[method];

    if (typeof fn !== 'function') return fallback;

    try {
      return await fn(...args);
    } catch {
      return fallback;
    }
  };
}

export const electronClient = {
  minimize() {
    return getGlobalLauncherApi()?.minimize?.();
  },
  maximize() {
    return getGlobalLauncherApi()?.maximize?.();
  },
  close() {
    return getGlobalLauncherApi()?.close?.();
  },
  supportedLaunchers: makeSafeCall('supportedLaunchers', []),
  scan: makeSafeCall('scan', null),
  importApps: makeSafeCall('import', null),
  launchApp: makeSafeCall('launchApp', {
    ok: false,
    message: 'Could not reach the Electron launch handler. Restart the app and try again.',
  }),
};

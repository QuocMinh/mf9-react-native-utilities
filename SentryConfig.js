import Sentry from 'sentry-expo';
import { SentrySeverity } from 'react-native-sentry';

let sentryDns;

export const setDns = (dns) => {
  if (!dns) throw new Error('DNS IS NOT NULL');
  else sentryDns = dns;
}

// Function to configure Sentry. Call this when your app mounts
export const configure = (dns = '') => {
  if (dns) setDns(dns);
  if (!sentryDns) throw new Error('Dns is empty, please set dsn first. Thanks!');

  Sentry.enableInExpoDevelopment = false;
  Sentry.config(dns).install();
};

export const setExtraContext = () => {
  Sentry.setExtraContext({
    store: store.getState(),
  });
};

export const setTagsContext = (ctx) => {
  Sentry.setTagsContext({
    environment: ctx.environment,
  });
};

export const setUserContext = (ctx) => {
  Sentry.setUserContext(ctx);
};

export const captureError = (msg) => {
  if (!sentryDns) return;
  Sentry.captureMessage(msg, {
    level: SentrySeverity.Error,
  });
};

export const captureWarning = (msg) => {
  if (!sentryDns) return;
  Sentry.captureMessage(msg, {
    level: SentrySeverity.Warning,
  });
};

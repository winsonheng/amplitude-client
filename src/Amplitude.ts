import * as amplitude from '@amplitude/analytics-browser';
import { TIME_ELAPSED_SINCE_LAST_EVENT } from './event/constants/EventPlugins';
import { EventAnalytics } from './event/analytics/EventAnalytics';

export enum LOG_LEVEL {
  NONE = amplitude.Types.LogLevel.None,
  ERROR = amplitude.Types.LogLevel.Error,
  WARN = amplitude.Types.LogLevel.Warn,
  VERBOSE = amplitude.Types.LogLevel.Verbose,
  DEBUG = amplitude.Types.LogLevel.Debug
}

export function init(apiKey: string, logLevel: LOG_LEVEL=LOG_LEVEL.WARN, userId: string=null, properties: amplitude.Types.BrowserOptions={}): void {
  // TODO: Document clearly what properties accept (e.g. default events can accept a 'trackOn' listener)
  properties.logLevel = logLevel.valueOf();

  if (userId === null) {
    console.log('No user id set');
    amplitude.init(apiKey, properties);
  } else {
    console.log('User ID:', userId);
    amplitude.init(apiKey, userId, properties);
    amplitude.reset();
  }
}

export function logout(): void {
  amplitude.reset();
}
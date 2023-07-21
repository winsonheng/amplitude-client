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

export function init(apiKey: string, userId?: string, properties?: amplitude.Types.BrowserOptions): void {
  // TODO: Document clearly what properties accept (e.g. default events can accept a 'trackOn' listener)
  amplitude.init(apiKey, userId, properties);
}
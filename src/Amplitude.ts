import * as amplitude from '@amplitude/analytics-browser';
import { TIME_ELAPSED_SINCE_LAST_EVENT } from './event/constants/EventPlugins';
import { EventAnalytics } from './event/analytics/EventAnalytics';

export function init(apiKey: string, userId?: string, properties?: amplitude.Types.BrowserOptions): void {
    // TODO: Each default event can accept a 'trackOn' listener
  amplitude.init(apiKey, userId, properties);
}
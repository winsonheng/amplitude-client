import * as amplitude from '@amplitude/analytics-browser';
import { TIME_ELAPSED_SINCE_LAST_EVENT } from './event/constants/EventPlugins';
import { EventAnalytics } from './event/analytics/EventAnalytics';

export function init(apiKey: string, userId?: string, properties?: object, logLevel?: amplitude.Types.LogLevel,
  pageViews: boolean = true, sessions: boolean = true, formInteractions: boolean = true, fileDownloads: boolean = true): void {
    // TODO: Each default event can accept a listener
  amplitude.init(apiKey, userId, {
    ...properties,
    logLevel,
    defaultTracking: {
      pageViews,
      sessions,
      formInteractions,
      fileDownloads
    }
  });
}

//#region user identification and properties

export function setUserProperties(properties: object): void {
  const identifyEvent = new amplitude.Identify();
  for (const key in properties) {
    identifyEvent.set(key, properties[key]);
  }

  amplitude.identify(identifyEvent);
}

export function setUserType(userType: string): void {
  this.setUserProperties({ userType });
}

export function setUserOrganization(organization: string): void {
  // TODO: User setGroup?
  this.setUserProperties({ organization });
}

export function setUserSite(site: string): void {
  this.setUserProperties({ site });
}

//#endregion
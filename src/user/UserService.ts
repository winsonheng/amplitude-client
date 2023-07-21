import * as amplitude from '@amplitude/analytics-browser'
import { UserSettings } from './util/UserSettings';
import { COMMON_USER_PROPERTIES } from './constants/CommonUserProperties';

//#region user identification and properties

export function setUserProperty(propertyName: string, defaultValue: string) {
  // TODO: Use Identify API to allow user to backdate certain event properties
  UserSettings.setUserProperty(propertyName, defaultValue);
}

export function setUserType(userType: string): void {
  setUserProperty(COMMON_USER_PROPERTIES.USER_TYPE, userType);
}

export function setUserOrganization(organization: string): void {
  // TODO: User setGroup?
  // This feature is available in accounts with a Growth or Enterprise plan with the Accounts add-on.
  setUserProperty(COMMON_USER_PROPERTIES.ORGANIZATION, organization);
}

export function setUserSite(site: string): void {
  setUserProperty(COMMON_USER_PROPERTIES.SITE, site);
}

//#endregion
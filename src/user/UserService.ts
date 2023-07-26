import * as amplitude from '@amplitude/analytics-browser'
import { UserSettings } from './util/UserSettings';
import { COMMON_USER_PROPERTIES } from './constants/CommonUserProperties';

//#region user identification and properties

export function setUserProperty(propertyName: string, defaultValue: string) {
  // TODO: Use Identify API to allow user to backdate certain event properties
  UserSettings.setUserProperty(propertyName, defaultValue);
}

export function removeUserProperty(propertyName: string) {
  UserSettings.removeUserProperty(propertyName);
}

export function setUserType(value: string): void {
  setUserProperty(COMMON_USER_PROPERTIES.USER_TYPE, value);
}

export function setUserOrganization(value: string): void {
  // TODO: User setGroup?
  // This feature is available in accounts with a Growth or Enterprise plan with the Accounts add-on.
  setUserProperty(COMMON_USER_PROPERTIES.ORGANIZATION, value);
}

export function setUserSite(value: string): void {
  setUserProperty(COMMON_USER_PROPERTIES.SITE, value);
}

export function removeUserType(): void {
  removeUserProperty(COMMON_USER_PROPERTIES.USER_TYPE);
}

export function removeUserOrganization(): void {
  // TODO: User setGroup?
  // This feature is available in accounts with a Growth or Enterprise plan with the Accounts add-on.
  removeUserProperty(COMMON_USER_PROPERTIES.ORGANIZATION);
}

export function removeUserSite(): void {
  removeUserProperty(COMMON_USER_PROPERTIES.SITE);
}

//#endregion
import * as amplitude from '@amplitude/analytics-browser'
import { UserSettingsManager } from './util/UserSettingsManager';
import { COMMON_USER_PROPERTIES, DEVICE_TYPE, USER_TYPE } from './constants/CommonUserProperties';

//#region user identification and properties

export function setUserProperty(propertyName: string, defaultValue: string) {
  UserSettingsManager.setUserProperty(propertyName, defaultValue);
}

export function removeUserProperty(propertyName: string) {
  UserSettingsManager.removeUserProperty(propertyName);
}

export function setDeviceId(value: string): void {
  amplitude.setDeviceId(value);
}

export function setUserId(value: string): void {
  console.log('Setting user id:', value);
  amplitude.setUserId(value);
}

export function setDeviceType(value: DEVICE_TYPE | string): void {
  console.log(value);
  setUserProperty(COMMON_USER_PROPERTIES.DEVICE_TYPE, value);
}

export function setUserType(value: USER_TYPE | string): void {
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
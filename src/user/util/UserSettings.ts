import * as amplitude from '@amplitude/analytics-browser'

/**
 * Helper class to keep track of added properties with default values and untracked user properties.
 */

export class UserSettings {
  private static defaultPropertyValues: {[property: string]: string} = {}

  static setUserProperty(property: string, defaultValue: string): void {
    UserSettings.defaultPropertyValues[property] = defaultValue;
    UserSettings.updateUserProperties();
  }

  static removeUserProperty(property: string) {
    if (UserSettings.defaultPropertyValues[property]) {
      delete UserSettings.defaultPropertyValues[property];
    }
    UserSettings.updateUserProperties();
  }

  static getDefaultPropertyValues(): {[property: string]: string} {
    return UserSettings.defaultPropertyValues;
  }

  static updateUserProperties(): void {
    const identifyEvent = new amplitude.Identify();

    for (const key in UserSettings.defaultPropertyValues) {
      console.log('Updating User Property ||| Key:', key, 'Value:', UserSettings.defaultPropertyValues[key])
      identifyEvent.set(key, UserSettings.defaultPropertyValues[key]);
    }
  
    console.log('The user properties you have added: ', identifyEvent.getUserProperties());
    amplitude.identify(identifyEvent);
  }
}
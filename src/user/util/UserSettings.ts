import * as amplitude from '@amplitude/analytics-browser'

/**
 * Helper class to keep track of added properties with default values and untracked user properties.
 */

export class UserSettings {
  private static defaultPropertyValues: {[property: string]: string} = {}

  static setUserProperty(property: string, defaultValue: string): void {
    UserSettings.defaultPropertyValues[property] = defaultValue;

    const identifyEvent = new amplitude.Identify();
    
    identifyEvent.set(property, defaultValue);
    amplitude.identify(identifyEvent);

    console.log('+++ Adding user property', identifyEvent.getUserProperties(),'+++');
  }

  static removeUserProperty(property: string): void {
    if (UserSettings.defaultPropertyValues[property]) {
      const identifyEvent = new amplitude.Identify();

      identifyEvent.remove(property, UserSettings.defaultPropertyValues[property]);
      amplitude.identify(identifyEvent);
      console.log('--- Removing user property', identifyEvent.getUserProperties(), '---');

      delete UserSettings.defaultPropertyValues[property];
    }
  }

  static getDefaultPropertyValues(): {[property: string]: string} {
    return UserSettings.defaultPropertyValues;
  }
}
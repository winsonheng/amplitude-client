import * as amplitude from '@amplitude/analytics-browser'

/**
 * Helper class to keep track of added properties with default values and untracked user properties.
 */

export class UserSettingsManager {
  private static defaultPropertyValues: {[property: string]: string} = {}

  static setUserProperty(property: string, defaultValue: string): void {
    UserSettingsManager.defaultPropertyValues[property] = defaultValue;

    const identifyEvent = new amplitude.Identify();
    
    identifyEvent.set(property, defaultValue);
    amplitude.identify(identifyEvent);

    console.log('+++ Adding user property', identifyEvent.getUserProperties(),'+++');
  }

  static removeUserProperty(property: string): void {
    if (UserSettingsManager.defaultPropertyValues[property]) {
      const identifyEvent = new amplitude.Identify();

      identifyEvent.remove(property, UserSettingsManager.defaultPropertyValues[property]);
      amplitude.identify(identifyEvent);
      console.log('--- Removing user property', identifyEvent.getUserProperties(), '---');

      delete UserSettingsManager.defaultPropertyValues[property];
    }
  }

  static getDefaultPropertyValues(): {[property: string]: string} {
    return UserSettingsManager.defaultPropertyValues;
  }
}
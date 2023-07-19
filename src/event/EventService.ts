import * as amplitude from '@amplitude/analytics-browser'
import { EventAnalytics } from './analytics/EventAnalytics';
import { EventPluginFunctionList } from './util/EventPluginFunctionList';

//#region event tracking

export function track(eventName: string, eventProperties?: object): void {
  amplitude.track(eventName, eventProperties);
}

export function trackToProject(apiKey: string, eventName: string, eventProperties?: object): void {
  const instance = amplitude.createInstance();
  instance.init(apiKey);
  instance.track(eventName, eventProperties);
}

//#region event tracking with plugins to modify properties


/**
 * Modifies an event through a user-supplied function whenever an event is tracked.
 * 
 * @param executeFunction Function invoked to change an Event's properties. 
 */
export function addEventUpdateFunction(executeFunction: (event: amplitude.Types.Event) => amplitude.Types.Event, name?: string): void {

  EventPluginFunctionList.add(executeFunction, name);
}

/**
 * Updates a specific event property through a user-supplied function whenever an event is tracked.
 * 
 * @param propertyName The Event property to update.
 * @param initValue Initial value for the property.
 * @param updateFunction Function invoked to change an Event's properties. 
 */
export function addEventPropertyUpdateFunction<T>(propertyName: string, initValue: T, updateFunction: (before: T) => T, name?: string): void {
  console.log('adding update function');

  let value = initValue;

  const pluginFunction = (event: amplitude.Types.Event) => {
    console.log(`(((((((((((((( Executing Function: ${name} with old value: ${value} ))))))))))))))`);

    value = updateFunction(value);

    event.event_properties = {
      ...event.event_properties,
      [propertyName]: value
    };

    console.log(`(((((((((((((( Finished executing Function: ${name} with new value: ${value} ))))))))))))))`);

    return event;
  };

  EventPluginFunctionList.add(pluginFunction, name);
}

export function removeEventFunction(name: string) {
  EventPluginFunctionList.remove(name);
}

export function removeEventPropertyFunction(name: string) {
  EventPluginFunctionList.remove(name);
}

//#endregion

//#endregion
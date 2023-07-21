import * as amplitude from '@amplitude/analytics-browser'
import { EventAnalytics } from './analytics/EventAnalytics';
import { EventPluginManager } from './util/EventPluginManager';

//#region event tracking

export function track(eventName: string, eventProperties?: object): void {
  amplitude.track(eventName, eventProperties);
}

//#endregion


//#region plugins and functions to modify event properties before they are sent

/**
 * Modifies an event through a user-supplied function whenever an event is tracked.
 * 
 * @param executeFunction Function invoked to change an Event's properties. 
 */
export function addEventUpdateFunction(executeFunction: (event: amplitude.Types.Event) => amplitude.Types.Event, name?: string): void {

  EventPluginManager.add(executeFunction, name);
}

/**
 * Updates a specific event property through a user-supplied function whenever an event is tracked.
 * 
 * @param propertyName The Event property to update.
 * @param initValue Initial value for the property.
 * @param updateFunction Function invoked to change an Event's properties.
 * @param name Must be specified if you wish to remove the function later on.
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

  EventPluginManager.add(pluginFunction, name);
}

/**
 * Removes a previously added plugin function.
 * 
 * @param name Identifier of the function to remove.
 */
export function removeEventFunction(name: string): void {
  EventPluginManager.remove(name);
}

/**
 * Removes a previously added plugin function.
 * 
 * @param name Identifier of the function to remove.
 */
export function removeEventPropertyFunction(name: string): void {
  EventPluginManager.remove(name);
}

//#endregion
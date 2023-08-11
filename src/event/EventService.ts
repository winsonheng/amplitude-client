import * as amplitude from '@amplitude/analytics-browser'
import { EventAnalytics } from './analytics/EventAnalytics';
import { EventPluginManager } from './util/EventPluginManager';
import { EventPlugins } from '..';
import { INCREMENT } from './constants/EventPropertyFunctions';

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
export function addPlugin(executeFunction: (event: amplitude.Types.Event) => amplitude.Types.Event, name?: string): void {

  EventPluginManager.add(executeFunction, name);
}

/**
 * Updates a specific event property through a user-supplied plugin whenever an event is tracked.
 * 
 * @param propertyName The Event property to update.
 * @param initValue Initial value for the property.
 * @param propertyFunction Function invoked which updates the value of the specified property based on the previous value.
 * @param pluginName Must be specified if you wish to remove the plugin later on.
 */
export function addPluginWithPropertyFunction<T>(propertyName: string, initValue: T, propertyFunction: (before: T) => T, pluginName?: string): void {
  console.log('adding update function');

  let value = initValue;

  const pluginFunction = (event: amplitude.Types.Event) => {
    console.log(`Executing Plugin: ${pluginName} with old value: ${value}`);

    value = propertyFunction(value);

    event.event_properties = {
      ...event.event_properties,
      [propertyName]: value
    };

    console.log(`Finished executing Plugin: ${pluginName} with new value: ${value}`);

    return event;
  };

  EventPluginManager.add(pluginFunction, pluginName);
}

/**
 * Removes a previously added plugin function.
 * 
 * @param pluginName Identifier of the function to remove.
 */
export function removePlugin(pluginName: string): void {
  EventPluginManager.remove(pluginName);
}

/**
 * Initializes the master plugin (not intended to be called from the client)
 */
EventPluginManager.initMasterPlugin();

//#endregion
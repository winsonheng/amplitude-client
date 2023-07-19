import * as amplitude from '@amplitude/analytics-browser'
import { SAVE_EVENT_TO_QUEUE } from '../constants/EventPlugins';

/**
 * Helper class to store all plugin functions which have been added.
 * Runs them one by one followed by saveEventToQueue at the end to ensure event is saved only once.
 */

export class EventPluginFunctionList {
  private static readonly pluginFunctionList: {
    [name: string]: (event: amplitude.Types.Event) => amplitude.Types.Event
  } = {}
  // Added as the last function to save the event to history
  private static readonly SAVE_EVENT_FUNCTION = SAVE_EVENT_TO_QUEUE
  private static readonly PLUGIN_NAME = 'Combined Plugin'
  private static isPluginAdded = false

  static add(pluginFunction: (event: amplitude.Types.Event) => amplitude.Types.Event, name: string): boolean {
    if (name == null) {
      // TODO: generate random name if not supplied
    }
    if (EventPluginFunctionList.pluginFunctionList[name] != null) {
      console.log('Plugin Already Exists! Name: ', name);
      return false;
    }

    EventPluginFunctionList.pluginFunctionList[name] = pluginFunction;

    EventPluginFunctionList.updateAmplitudePlugin();

    return true;
  }

  static remove(name: string): boolean {
    if (EventPluginFunctionList.pluginFunctionList[name] == null) {
      console.log('Cannot remove non-existent plugin! Name: ', name);
      return false;
    }

    delete EventPluginFunctionList.pluginFunctionList[name];

    EventPluginFunctionList.updateAmplitudePlugin();

    return true;
  }

  static updateAmplitudePlugin() {
    if (EventPluginFunctionList.isPluginAdded) {
      // TODO: Not sure why this causes error (seems like the plugin is not actually there yet)
      amplitude.remove(EventPluginFunctionList.PLUGIN_NAME);
    }

    const plugin = (): amplitude.Types.EnrichmentPlugin => {
  
      return {
        name: EventPluginFunctionList.PLUGIN_NAME,
        execute: async (event: amplitude.Types.Event) => {
          console.log('============Running plugin==========');
  
          for (const key in EventPluginFunctionList.pluginFunctionList) {
            if (!EventPluginFunctionList.pluginFunctionList.hasOwnProperty(key)) {
              console.log('This key does not exist: ', key);
              continue;
            }

            EventPluginFunctionList.pluginFunctionList[key](event);
          }
  
          console.log('============Finished running plugin===========');
  
          EventPluginFunctionList.SAVE_EVENT_FUNCTION(event);
  
          return event;
        },
      };
    };

    amplitude.add(plugin());

    EventPluginFunctionList.isPluginAdded = true;

  }
}
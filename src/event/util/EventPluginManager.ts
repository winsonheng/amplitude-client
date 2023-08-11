import * as amplitude from '@amplitude/analytics-browser'
import { SAVE_EVENT_TO_QUEUE } from '../constants/EventPlugins';

/**
 * Helper class to keep track of all plugin functions which have been added.
 * Runs them one by one followed by saveEventToQueue at the end to ensure event is saved only once.
 */
export class EventPluginManager {
  private static readonly PLUGIN_NAME = 'Master Plugin'
  private static pluginFunctionList: {
    [name: string]: (event: amplitude.Types.Event) => amplitude.Types.Event
  } = {}
  private static isMasterPluginAdded = false


  static add(pluginFunction: (event: amplitude.Types.Event) => amplitude.Types.Event, name: string): boolean {
    if (name == null) {
      // TODO: generate random name if not supplied
    }
    if (EventPluginManager.pluginFunctionList[name] != null) {
      console.log('Plugin Already Exists! Name: ', name);
      return false;
    }

    EventPluginManager.pluginFunctionList[name] = pluginFunction;

    return true;
  }

  static remove(name: string): boolean {
    if (EventPluginManager.pluginFunctionList[name] == null) {
      console.log('Cannot remove non-existent plugin! Name: ', name);
      return false;
    }

    delete EventPluginManager.pluginFunctionList[name];

    return true;
  }

  /**
   * Adds a single master plugin that will execute all the plugin functions that have been added
   */
  static async initMasterPlugin() {
    console.log(`//////////////////////////////////////////////////////\n
    INIT MASTER PLUGIN\n
    //////////////////////////////////////////////////////\n`);
    if (EventPluginManager.isMasterPluginAdded) {
      return;
    }

    EventPluginManager.isMasterPluginAdded = true;

    const masterPlugin = (): amplitude.Types.EnrichmentPlugin => {
  
      return {
        name: EventPluginManager.PLUGIN_NAME,
        execute: async (event: amplitude.Types.Event) => {
          console.log('----------------------Running plugin user-defined functions----------------------');

          // Execute each of the plugins one by one
          for (const key in EventPluginManager.pluginFunctionList) {
            if (!EventPluginManager.pluginFunctionList.hasOwnProperty(key)) {
              continue;
            }

            console.log('>>>>>>>>    Running plugin function:', key, '  <<<<<<<<');

            EventPluginManager.pluginFunctionList[key](event);
          }
  
          console.log('----------------------Finished running user-defined functions----------------------');
          console.log('===================Running library-defined functions====================');
  
          SAVE_EVENT_TO_QUEUE(event);

          console.log('===================Finished running library-defined functions===================');
  
          return event;
        },
      };
    };

    amplitude.add(masterPlugin());

  }
}
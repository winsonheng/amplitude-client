import * as amplitude from '@amplitude/analytics-browser'
import { SAVE_EVENT_TO_QUEUE } from '../constants/EventPlugins';

/**
 * Helper class to keep track of all plugin functions which have been added.
 * Runs them one by one followed by saveEventToQueue at the end to ensure event is saved only once.
 */
export class EventPluginManager {
  private static readonly PLUGIN_NAME = 'Combined Plugin'
  private static pluginFunctionList: {
    [name: string]: (event: amplitude.Types.Event) => amplitude.Types.Event
  } = {}
  private static isPluginAdded = false
  private static addRemoveTaskQueue = Promise.resolve();


  static add(pluginFunction: (event: amplitude.Types.Event) => amplitude.Types.Event, name: string): boolean {
    if (name == null) {
      // TODO: generate random name if not supplied
    }
    if (EventPluginManager.pluginFunctionList[name] != null) {
      console.log('Plugin Already Exists! Name: ', name);
      return false;
    }

    EventPluginManager.pluginFunctionList[name] = pluginFunction;

    EventPluginManager.updateAmplitudePlugin();

    return true;
  }

  static remove(name: string): boolean {
    if (EventPluginManager.pluginFunctionList[name] == null) {
      console.log('Cannot remove non-existent plugin! Name: ', name);
      return false;
    }

    delete EventPluginManager.pluginFunctionList[name];

    EventPluginManager.updateAmplitudePlugin();

    return true;
  }

  static async updateAmplitudePlugin() {
// TODO: wrap around this
//     setTimeout(asyncFunc, 0)
// instead of asyncFunc()
  console.log(`//////////////////////////////////////////////////////\n
  //////////////////////////////////////////////////////\n
  //////////////////////////////////////////////////////\n
  //////////////////////////////////////////////////////\n
  //////////////////////////////////////////////////////\n`);
    if (EventPluginManager.isPluginAdded) {
      EventPluginManager.addRemoveTaskQueue = EventPluginManager.addRemoveTaskQueue.then(async () => {
        console.log(`********************************************\n
      ********************************************\n
      ********************************************\n
      REMOVING PLUGIN
      ********************************************\n
      ********************************************\n
      ********************************************\n`);
        return await amplitude.remove(EventPluginManager.PLUGIN_NAME).promise.then(() => {
          console.log(`********************************************\n
      ********************************************\n
      ********************************************\n
      FINISHED REMOVING PLUGIN
      ********************************************\n
      ********************************************\n
      ********************************************\n`);
        });
      });
    }

    const plugin = (): amplitude.Types.EnrichmentPlugin => {
  
      return {
        name: EventPluginManager.PLUGIN_NAME,
        execute: async (event: amplitude.Types.Event) => {
          console.log('============Running plugin user-defined functions==========');

          console.log('User properties: ', event.user_properties);
  
          for (const key in EventPluginManager.pluginFunctionList) {
            if (!EventPluginManager.pluginFunctionList.hasOwnProperty(key)) {
              console.log('This key does not exist: ', key);
              continue;
            }

            EventPluginManager.pluginFunctionList[key](event);
          }
  
          console.log('============Finished running user-defined functions===========');
          console.log('============Running library-defined functions====================');
  
          SAVE_EVENT_TO_QUEUE(event);

          console.log('============Finished running library-defined functions===========');
  
          return event;
        },
      };
    };


    EventPluginManager.addRemoveTaskQueue = EventPluginManager.addRemoveTaskQueue.then(async () => {
      console.log(`||||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n
    ADDING PLUGIN
    ||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n`);
      return await amplitude.add(plugin()).promise.then(() => {
        console.log(`||||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n
    FINISHED ADDING PLUGIN
    ||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n
    ||||||||||||||||||||||||||||||||||\n`);
      });
    });

    EventPluginManager.isPluginAdded = true;
  }
}
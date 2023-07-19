import * as amplitude from '@amplitude/analytics-browser';
import { EventAnalytics } from '../analytics/EventAnalytics';

/**
 * Function called after execution of plugin function to keep track 
 * of the most recent event of each event type.
 * 
 * @param event Event which has just been tracked.
 * @returns The same event
 */
export const SAVE_EVENT_TO_QUEUE = (event: amplitude.Types.Event): amplitude.Types.Event => {
    EventAnalytics.pushEvent(event);
    return event;
}


export const TIME_ELAPSED_SINCE_LAST_EVENT = (event: amplitude.Types.Event): amplitude.Types.Event => {
    // Can also use cookies['lastEventTime'] but this doesnt take into account the event type
    const lastEvent = EventAnalytics.getLastEvent(event.event_type);

    // Or should we just set this to 0 if it is the first event?
    const timeElapsed = event.time - (lastEvent != null ? lastEvent.time : 0);

    console.log('===========The elapsed time is : ', timeElapsed, "================");

    event.event_properties['time_elapsed'] = timeElapsed;

    return event;
}

// TODO: Add a function similar to INCREMENT that applies within the same event_type only
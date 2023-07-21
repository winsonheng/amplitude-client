import * as amplitude from '@amplitude/analytics-browser';
import { EventAnalytics } from '../analytics/EventAnalytics';
import { UserSettings } from '../../user/util/UserSettings';


/**
 * Final function called in the event plugin's execute method to save the 
 * most recent event of its event type.
 * 
 * @param event Event which has just been tracked.
 * @returns The same event.
 */
export const SAVE_EVENT_TO_QUEUE = (event: amplitude.Types.Event): amplitude.Types.Event => {
    EventAnalytics.pushEvent(event);
    return event;
}


export const TIME_ELAPSED_SINCE_LAST_EVENT = (event: amplitude.Types.Event): amplitude.Types.Event => {
    // Can also use cookies['lastEventTime'] but this doesnt take into account the event type
    const lastEvent = EventAnalytics.getLastEvent(event.event_type);

    // Set to 0 if it is the first event of an event type
    const timeElapsed = lastEvent == null ? 0 : event.time - lastEvent.time;

    console.log('===========The elapsed time is : ', timeElapsed, "================");

    event.event_properties['time_elapsed'] = timeElapsed;

    return event;
}


/**
 * An increment function appends to the event the number of times the same event type has been tracked.
 * 
 * @param event Event which has just been tracked.
 * @returns The same event.
 */
export const COUNT_EVENT_TYPE = (event: amplitude.Types.Event): amplitude.Types.Event => {
    const lastEvent = EventAnalytics.getLastEvent(event.event_type);

    const eventCount = 1 + (lastEvent == null ? 0 : lastEvent.event_properties['count']);

    event.event_properties['count'] = eventCount;

    return event;
}
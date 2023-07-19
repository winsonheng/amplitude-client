import * as amplitude from '@amplitude/analytics-browser'

export class EventAnalytics {
  private static instances: { [eventType: string]: EventAnalytics } = {}
  private previousEvent: amplitude.Types.Event

  constructor(eventType: string) {
      EventAnalytics.instances[eventType] = this;
  }

  static pushEvent(event: amplitude.Types.Event): void {
    let instance = EventAnalytics.instances[event.event_type];

    if (instance === undefined) {
      instance = new EventAnalytics(event.event_type);
      EventAnalytics.instances[event.event_type] = instance;
    }

    if (instance.previousEvent !== undefined && instance.previousEvent.event_id === event.event_id) {
      // Event already added, return
      // This happens when multiple plugins are added as their functions run one after another
      console.log('Event already added! ID: ', event.event_id);
      return;
    }

    console.log("New event +++ Type: ", event.event_type, ", ID: ", event.event_id, " +++ has been added to the queue. ", event);

    instance.previousEvent = event;
  }

  static getLastEvent(eventType: string): amplitude.Types.Event {
    const instance = EventAnalytics.instances[eventType];

    if (instance === undefined) {
      console.log("No previous event to get");
      return null;
    }

    console.log('The last event <<< Type: ', instance.previousEvent.event_type, ', ID: ', instance.previousEvent.event_id, " <<<");

    return instance.previousEvent;
  }
}
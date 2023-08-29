# amplitude-client

### File Structure

    src
    ├── ...
    ├── event                                       
    │     ├── analytics                             
    │     │     └── EventAnalytics.ts               # Class to keep track of previously registered events within the session
    │     ├── constants                             
    │     │     ├── EventPlugins.ts                 # Provides plugins which take an event and modify it or extract values from it
    │     │     └── EventPropertyFunctions.ts       # Provides functions and default values that you can use in your plugins to modify an event property
    │     ├── util                                  
    │     |     └── EventPluginManager.ts           # Manages the list of plugins that you have added/removed
    |     └── EventService.ts                       # Facade for functions related to events
    |
    ├── user                                        
    │     ├── constants                             
    │     │     └── CommonUserProperties.ts         # Enums of default user properties
    │     ├── util                                  
    │     |     └── UserSettingsManager.ts          # Manages the settings and properties added to the current user
    |     └── UserService.ts                        # Facade for functions related to users
    |
    ├── Amplitude.ts                                # Initialize and reset the amplitude client
    └── ...

### Init
1. Clone this repo
2. `yarn`
3. cd to the project you want to import this library in
4. `yarn add amplitude-client@file:"path\to\repo"`

### Build
`npx tsc`

### Usage Examples
#### Initializing Amplitude (Only done once)
```
import * as amp from "amplitude-client";
amp.init(process.env.REACT_APP_AMPLITUDE_API_KEY, amp.LOG_LEVEL.DEBUG);
```

#### Initialize user properties
```
amp.setDeviceType(DEVICE_TYPE.WEB_DASHBOARD);
amp.setUserType(USER_TYPE.DOCTOR);
amp.setUserId(email);
```

#### Track Event
```
amp.track("added helper library");
```

#### Add Pre-defined Plugin
* Use `addPlugin()` to add a plugin that modifies tracked events directly
* Use `addPluginWithPropertyFunction()` to add a plugin which modifies **a single event property** based on the given function and its previous value

Adds a property that calculates the time elapsed since the previous event of the same type:
```
addPlugin(EventPlugins.TIME_ELAPSED_SINCE_LAST_EVENT, 'time_elapsed');
```

Appends the HREF value to the event when `amp.track()` is called:
```
amp.addPluginWithPropertyFunction('href', amp.EventPropertyPlugins.HREF.INIT_VALUE, amp.EventPropertyPlugins.HREF.FUNCTION, 'href');
```

#### You can also define your own plugins and property functions.

Deletes a property from tracked events:
```
addPlugin((event) => {
  if (event.event_properties['redacted']) {
    delete event.event_properties['redacted'];
  }
  return event;
}, 'delete redacted property');
```

Count number of times a type of event has been tracked:
```
addPluginWithPropertyFunction('count', 0, (prev) => prev + 1, 'counter');
```

#### Remove Plugin
```
amp.removePluginFunction('pluginName');
```

#### Anonymise user after they log out
```
amp.logout();
```

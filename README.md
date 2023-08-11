# amplitude-client

Please see [`amplitude-test`](https://github.com/Medios-Technologies/remidio-common-dashboard-frontend/tree/amplitude-test) branch for implementation example.

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
    │     │     └── CommonUserProperties.ts         # Enums of default user properties specific to Remidio
    │     ├── util                                  
    │     |     └── UserSettingsManager.ts          # Manages the settings and properties added to the current user
    |     └── UserService.ts                        # Facade for functions related to users
    |
    ├── Amplitude.ts                                # Initialize and reset the amplitude client
    └── ...

### Init
1. Clone this repo
2. 

### Build
`npx tsc`

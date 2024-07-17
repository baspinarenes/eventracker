# TODO

This is the markdown todo file for project a.

## Feature

- [ ] Add feature to remove all eventracker listeners.
- [ ] Add threshold timeout feature for seen event. For 
example, if the user has been on the page for more than 
10 seconds, fire the seen event.
- [ ] Add toast messages feature flag for debug mode
- [ ] Add modifier metod to eventracker registers.

```ts
const ref = useEventTracker({ click: {} }, {
  modifier: (payload, eventName, action) => {};
});
```

- [ ] Add filter event feature to eventracker registers.

```ts
const ref = useEventTracker({ click: {} }, ["custom-click"]);
```

- [ ] Add config file support.

```json eventracker.config.json
{
  "logMode": {
    "stage": true,
    "preprod": true,
    "prod": false
  }
}
```

- [ ] Add logging file and method to write summary to console.
- [ ] Add event based debugger.

## Bug

- 

## Test

- [ ] Test on SSR project

# DONE

- 
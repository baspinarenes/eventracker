# TODO

This is the markdown todo file for project a.

## Feature

- [ ] Add feature to remove all eventracker listeners.
- [ ] Add threshold timeout feature for seen event. For 
example, if the user has been on the page for more than 
10 seconds, fire the seen event.
- [ ] Add toast messages feature flag for debug mode
- [ ] Event options'a callback ver ve useEventTracker gerek kalmasin.
- [ ] Add event based debugger.
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


## Bug

## Test

- [ ] Should test on SSR.
- [ ] Should fire event when page transition with a element.

# DONE

- [x] Add click event support
- [x] Add hover event support
- [x] Add seen event support
- [x] Add payload modifier method for eventracker registers.
- [x] Add payload modifier method for global.
- [x] Propagate if event is not defined in EventActionMap.
- [x] X kere çalışması için count tanımla.
- [x] Payload oluşturmak için safety sağlayan bir helper olabilir.
- [x] Add method to write summary to console.

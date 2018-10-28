## Milestone: Self-hosted static app

- [x] Load data from git-ignored file db (with example provided)
- [x] Document steps to publish
- [x] Make set phrase customizable
- [x] Redesign activity section
- [x] Add favicon and web manifest

## ~~Milestone: Sharable viable product~~

> 1.  I abandoned this milestone to avoid spending time on server stuff for this app and move on to other more interesting work. All user data comes from a single JS object (exported by data.js) so it's fairly simple for anyone to clone this repo and publish their own static instance of this app without requiring authentication, admin, etc.

> 2.  While this is a React Native project I didn't bother publishing on app stores. The react-native-web version works just fine with a browser bookmark on both my laptop and phone.

- [ ] React Native (start with this to figure out design constraints and avoid rewriting code)
  - [x] Configure Cosmos with react-native-web
  - [x] Configure ESLint with react-native-web
  - [x] Configure CRNA
  - [x] Convert existing UI to react-native components
  - [ ] Fix background in native environments
  - [ ] Learn how to publish to app stores
- [x] Design activities
- [ ] Fixed header
  - [ ] Logo (resets state on click)
  - [ ] Info button to access onboarding
  - [ ] Edit button
- [ ] Register page (opened on Edit as guest)
  - [ ] Server, db and session
- [ ] Edit steps and activities page
  - [ ] "+ Add links or instructions" under steps without links
- [ ] Onboarding: What and why
- [x] Proper font, colors and spacing
- [ ] Medium article or Twitter thread

Nice to have:

- [x] Animated checkbox
- [x] Router (so native back button goes back in steps)
- [x] Fade in next steps (by rendering them all the time)
- [ ] Try different transition functions
- [ ] Fade in intro & outro text gradually to avoid mental skipping

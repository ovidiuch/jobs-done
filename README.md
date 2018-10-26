# Jobs Done!

An ritual app for ending the work day inspired by [Deep Work](https://www.goodreads.com/book/show/25744928-deep-work)

## Stack

This is a [React Native](https://facebook.github.io/react-native/) app built with [React Native for Web](https://github.com/necolas/react-native-web/). For web publishing, it compiles into a static app, with the app data embedded in the frontend build.

The project features a [custom server-side rendering implementation](https://github.com/skidding/jobs-done/blob/d3d85ce6c5b156249702d90190397bd67fdc31ed/tools/shared/renderIndex.js#L13-L39), which might be interesting for someone trying to understand how SSR works.

Styles are generated _universally_ using [styled-components](https://www.styled-components.com/). On native platforms, browsers and on the server. Pretty cool!

## How to use

### Install

Clone this repo and run `yarn install`.

### Run

Run `yarn start` to start the _web_ app locally in dev mode.

Run `yarn cosmos` to browse components independently.

### Customize

Copy [data.example.js](data.example.js) as `data.js` in project root. Customize it with your info.

### Publish

Run `yarn build` to create (static) production build.

Go to `build` dir and publish it using something like [Now](https://zeit.co/now) or [Surge](https://surge.sh/).

### Native

The aforementioned instructions are for running and publishing the web app. But this is a React _Native_ project. While I tested it on Android and iOS simulator, I didn't bother publishing _Jobs Done!_ on app stores. The web version already works just fine on both desktop and mobile ¯\\\_(ツ)\_/¯.

Open two terminals to load the app on native devices or simulators. In the first run `yarn cosmos:native`. In the second run `yarn start:native` for [Expo](https://expo.io/) or `yarn ios` or `yarn android` for a specific platform.

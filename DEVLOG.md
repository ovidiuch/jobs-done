Q: Is there a router abstraction for react-native-web? If yes, which is the simplest to use?

Options:

- https://reactnavigation.org/
- https://reacttraining.com/react-router/

What is the difference between the two?

A navigation seems to be more than a router. Navigators include navigation UI and can render elements such as headers or tab bars.

Resources:

- https://medium.com/@Or_yoffe/building-a-platform-agnostic-app-react-native-and-web-c0e82cbdda8
- https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293

Q: What am I looking for in a router?

To be able to render the same component instance between two routes with different props. To trigger componentDidUpdate on route change.

Q: How to combine react-router-native with react-router-dom into a _universal_ interface for RNW?

https://github.com/edupooch/simple-crna-routing

---

Q: How to resize SVG in RN automatically?

FIXME

https://github.com/react-native-community/react-native-svg/pull/596
https://www.sarasoueidan.com/blog/svg-coordinate-systems/ (via viewBox?)

---

Q: How to make styled-components to require `react-native-web` instead of `react-native` on the server? No webpack involved.

Call `@babel/node` with `--only 'components/**,tools/**,node_modules/styled-components/**'` (overriding the default Babel options which ignore node_modules). This way `babel-plugin-module-resolver` also transforms `styled-components` package.

---

Q: How to configure styled-components SSR with react-native-web?

Problems:

- ServerStyleSheet.collectStyles doesn't collect styles from native styled-components https://spectrum.chat/thread/2c63a455-9b05-40cd-9ff1-5388525f22b3

Conclusion: styled-components sends the styles to react-native-web, which generates the output. So it's out of styled-component's scope.

Solution: react-native-web has an API for extracting the styles for SSR: https://github.com/necolas/react-native-web/blob/9c8407162e37835e35853605c363842d66ac27ac/packages/react-native-web/src/exports/AppRegistry/renderApplication.js#L38-L56

---

Q: How to load custom fonts in RN?

Relied on default fonts for now.

---

Q: What can I use instead of media queries to create conditional formatting based on viewport?

https://github.com/necolas/react-native-web/blob/master/packages/website/guides/style.md#what-about-media-queries

---

Q: How to apply web-only styles to RNW components? (eg. `user-select`)

https://github.com/necolas/react-native-web/blob/master/packages/website/guides/getting-started.md#web-specific-code

Conditional styles that match `Platform.OS === 'web'`.

---

Q: How to make an element to only take up as much width as it needs in RN? (Eg. as `inline-block` would)

`margin-left: auto` or `margin-right: auto` https://stackoverflow.com/a/36606694/128816

---

Q: Where does Text component decide to use `<a>` tag based on `accessibilityRole`?

- react-native-web/src/exports/createElement/index.js
- react-native-web/src/modules/AccessibilityUtil/propsToAccessibilityComponent.js

---

Q: How to open link in new window on web?

https://github.com/necolas/react-native-web/issues/162

Q: But a Text component with `href` doesn't seem to open link on Native, how can an external link work in both environments?

https://github.com/necolas/react-native-web/issues/162#issuecomment-409619405

This is better: https://codesandbox.io/s/53r88k5opx (Not really, though. Web links still open link via href attribute, as well as call the onPress handler).

Ended up creating a custom component: https://github.com/skidding/jobs-done/blob/485058e7838093b7b5efb298e5ba7b5d2e0e15b9/components/Step/Link/index.js

---

Q: How does event propagation work in RN?

- Text.onPress seems to let event bubble up
- TouchableWithoutFeedback.onPress seems to stop event bubbling

Seems so https://stackoverflow.com/questions/31866671/how-to-stop-touch-event-propagation-in-react-native

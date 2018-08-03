Q: How to resize SVG in RN automatically?

FIXME

https://github.com/react-native-community/react-native-svg/pull/596
https://www.sarasoueidan.com/blog/svg-coordinate-systems/ (via viewBox?)

---

Q: How to load custom fonts in RN?

FIXME

---

Q: What can I use instead of media queries to create conditional formatting based on viewport?

https://github.com/necolas/react-native-web/blob/master/packages/website/guides/style.md#what-about-media-queries

---

Q: How to apply web-only style to RNW components? (eg. `user-select`)

https://github.com/necolas/react-native-web/blob/master/packages/website/guides/getting-started.md#web-specific-code

Conditional styles that match `Platform.OS === 'web'`

---

Q: How to make something `inline-block` in RN? (ie. only take as much width as it needs)

`margin-left: auto` or `margin-right: auto` https://stackoverflow.com/a/36606694/128816

---

Q: Where does Text transform into <a> tag based on `accessibilityRole`?

- react-native-web/src/exports/createElement/index.js
- react-native-web/src/modules/AccessibilityUtil/propsToAccessibilityComponent.js

---

Q: How to open link in new window on web?

https://github.com/necolas/react-native-web/issues/162

Q: But a Text component with `href` doesn't seem to open link on Native, how can an external link work in both environments?

https://github.com/necolas/react-native-web/issues/162#issuecomment-409619405

This is better: https://codesandbox.io/s/53r88k5opx (Not really, though. Web links still open link via href attribute, as well as call the onPress handler)

---

Q: How does event propagation work in RN?

- Text.onPress seems to let event bubble up
- TouchableWithoutFeedback.onPress seems to stop event bubbling

Seems so https://stackoverflow.com/questions/31866671/how-to-stop-touch-event-propagation-in-react-native

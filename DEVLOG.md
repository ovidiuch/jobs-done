Q: How to make something `inline-block` in RN (ie. only take as much width as it needs)

FIXME

---

Q: How to apply web-only style to RNW components? (eg. `user-select` or `cursor`)

FIXME

---

Q: Where does Text transform into <a> tag based on `accessibilityRole`?

- react-native-web/src/exports/createElement/index.js
- react-native-web/src/modules/AccessibilityUtil/propsToAccessibilityComponent.js

---

Q: How to open link in new window on web?

https://github.com/necolas/react-native-web/issues/162

Q: But a Text component with `href` doesn't seem to open link on Native, how can an external link work in both environments?

FIXME

---

Q: How does event propagation work in RN?

- Text.onPress seems to let event bubble up
- TouchableWithoutFeedback.onPress seems to stop event bubbling

Seems so https://stackoverflow.com/questions/31866671/how-to-stop-touch-event-propagation-in-react-native

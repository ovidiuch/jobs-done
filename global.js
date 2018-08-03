// NOTE: react-native-web says "Your application may need to polyfill Promise,
// Object.assign, Array.from, and ResizeObserver as necessary for your desired
// browser support."

// TODO: Remove or rename to `global-web`
import { injectGlobal } from 'styled-components';

injectGlobal`
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
  }

  button {
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
  }

`;

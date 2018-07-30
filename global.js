// NOTE: react-native-web says "Your application may need to polyfill Promise,
// Object.assign, Array.from, and ResizeObserver as necessary for your desired
// browser support."

import { injectGlobal } from 'styled-components';

injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    background: rgba(0, 9, 21, 1);
    color: rgba(217, 223, 247, 0.8);
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 18px;
  }

  button {
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
  }

  p {
    margin: 0 0 20px 0;
    line-height: 30px;

    :last-child {
      margin-bottom: 0;
    }
  }

  h2 {
    margin: 0 0 32px 0;
    color: rgba(234, 237, 247, 1);
    font-size: 32px;
    font-weight: 300;
    line-height: 40px;
    letter-spacing: 0.5px;
  }

  ul {
    margin: 0 0 20px 0;
    padding: 0 0 0 40px;

    :last-child {
      margin-bottom: 0;
    }
  }

  li {
    line-height: 24px;
    margin: 0 0 4px 0;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

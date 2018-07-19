import { injectGlobal } from 'styled-components';

injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    background: #f1f1f1;
    color: #111;
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 16px;
  }

  button {
    font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 16px;
  }

  p {
    line-height: 24px;
    margin: 0 0 16px 0;

    :last-child {
      margin-bottom: 0;
    }
  }

  li {
    line-height: 18px;
    margin: 0 0 4px 0;

    :last-child {
      margin-bottom: 0;
    }
  }
`;

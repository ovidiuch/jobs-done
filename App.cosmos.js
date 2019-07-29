// Cosmos Native entry point
import React, { Component } from 'react';
import { NativeFixtureLoader } from 'react-cosmos/native';

import {
  decorators,
  fixtures,
  rendererConfig
  // cosmos.userdeps is missing before the cosmos-native command generates it
  // eslint-disable-next-line import/no-unresolved
} from './tools/cosmos/cosmos.userdeps';

export default class App extends Component {
  render() {
    return (
      <NativeFixtureLoader
        rendererConfig={rendererConfig}
        fixtures={fixtures}
        decorators={decorators}
      />
    );
  }
}

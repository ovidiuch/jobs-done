import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';

export const Router = () => (
  <NativeRouter>
    <Route path="/:stepId?" component={App} />
  </NativeRouter>
);

class App extends Component {
  constructor(props) {
    super(props);
    console.log('Inner.constructor');
  }

  componentDidUpdate() {
    console.log('Inner.componentDidUpdate');
  }

  render() {
    const stepId = this.props.match.params.stepId || 1;

    return (
      <View>
        <Text>Current step: {stepId}</Text>
        <Link to="/1">
          <Text>Step 1</Text>
        </Link>
        <Link to="/2">
          <Text>Step 2</Text>
        </Link>
        <Link to="/3">
          <Text>Step 3</Text>
        </Link>
      </View>
    );
  }
}

import { object } from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Router, BackButton } from '../shared/universalRouter';
import { App as RouterlessApp } from './App';

export const App = () => (
  <Router>
    <Route path="/:stepIndex([0-9]+)?" component={AppRoute} />
  </Router>
);

class AppRoute extends Component {
  static propTypes = {
    history: object.isRequired,
    match: object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <BackButton>
        <RouterlessApp
          activeStepIndex={getActiveStepIndexFromParams(match.params)}
          setActiveStepIndex={this.setActiveStepIndex}
        />
      </BackButton>
    );
  }

  setActiveStepIndex = stepIndex => {
    this.props.history.push(`/${stepIndex}`);
  };
}

function getActiveStepIndexFromParams(params) {
  return typeof params.stepIndex !== 'undefined' ? Number(params.stepIndex) : 0;
}

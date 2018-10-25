import { object } from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router';
import { App } from './App';
import { appData } from '../../data';

export function Routes() {
  return <Route path="/:stepIndex([0-9]+)?" component={AppRoute} />;
}

class AppRoute extends Component {
  static propTypes = {
    history: object.isRequired,
    match: object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <App
        appData={appData}
        activeStepIndex={getActiveStepIndexFromParams(match.params)}
        setActiveStepIndex={this.setActiveStepIndex}
      />
    );
  }

  setActiveStepIndex = stepIndex => {
    this.props.history.push(`/${stepIndex}`);
  };
}

function getActiveStepIndexFromParams(params) {
  return typeof params.stepIndex !== 'undefined' ? Number(params.stepIndex) : 0;
}

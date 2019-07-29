import React from 'react';
import { FixtureContext } from 'react-cosmos-fixture';
import { appData } from '../../../data';
import { App } from '../App';

export default () => {
  const { fixtureState, setFixtureState } = React.useContext(FixtureContext);
  const activeStepIndex: number = fixtureState.activeStepIndex || 0;
  const setActiveStepIndex = stepIndex => {
    setFixtureState(fixtureState => {
      return { ...fixtureState, activeStepIndex: stepIndex };
    });
  };

  return (
    <App
      appData={appData}
      activeStepIndex={activeStepIndex}
      setActiveStepIndex={setActiveStepIndex}
    />
  );
};

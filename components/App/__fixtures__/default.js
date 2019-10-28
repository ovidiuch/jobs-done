import React from 'react';
import { useValue } from 'react-cosmos/fixture';
import { appData } from '../../../data';
import { App } from '../App';

export default () => {
  const [activeStepIndex, setActiveStepIndex] = useValue('activeStepIndex', {
    defaultValue: 0
  });

  return (
    <App
      appData={appData}
      activeStepIndex={activeStepIndex}
      setActiveStepIndex={setActiveStepIndex}
    />
  );
};

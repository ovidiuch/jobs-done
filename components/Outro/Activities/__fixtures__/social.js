import React from 'react';
import { StateMock } from '@react-mock/state';
import { appData } from '../../../../data';
import { Activities } from '..';

export default (
  <StateMock
    state={{ selectedActivityType: 'Social', selectedActivity: 'Hang out' }}
  >
    <Activities activities={appData.activities} />
  </StateMock>
);

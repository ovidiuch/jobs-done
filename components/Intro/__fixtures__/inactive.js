import React from 'react';
import { Intro } from '..';

export default (
  <Intro
    isActive={false}
    onStart={() => console.log('Intro start')}
    onSelect={() => console.log('Intro select')}
  />
);

import React from 'react';
import { Button } from '..';

export default (
  <Button
    label="Start"
    disabled={true}
    onPress={() => console.log('Button press')}
  />
);

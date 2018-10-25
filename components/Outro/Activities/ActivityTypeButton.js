import { string, func } from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { Button } from '../../shared/Button';
import { Transition, QUICK_TRANS_TIME } from '../../shared/Transition';

export function ActivityTypeButton({
  label,
  selectedActivityType,
  selectActivityType
}) {
  const isSelected = selectedActivityType === label;

  return (
    <Transition
      duration={QUICK_TRANS_TIME}
      value={!selectedActivityType || selectedActivityType === label ? 1 : 0.3}
    >
      {opacity => (
        <Container
          selectedActivityType={selectedActivityType}
          label={label}
          style={{ opacity }}
        >
          <Button
            label={label}
            onPress={() => selectActivityType(isSelected ? null : label)}
          />
        </Container>
      )}
    </Transition>
  );
}

ActivityTypeButton.propTypes = {
  label: string.isRequired,
  selectedActivityType: string,
  selectActivityType: func.isRequired
};

const Container = Animated.createAnimatedComponent(styled.View`
  margin: 0 16px 16px 0;
`);

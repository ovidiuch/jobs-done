import { func, node } from 'prop-types';
import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { stepState } from '../../shared/propTypes';
import { Transition } from '../../shared/Transition';

export class ActiveElement extends Component {
  static propTypes = {
    children: node.isRequired,
    state: stepState.isRequired,
    onLayout: func.isRequired
  };

  render() {
    const { children, state, onLayout } = this.props;

    return (
      <Transition duration={600} value={getBgOpacityForState(state)}>
        {opacity => (
          <Container state={state} onLayout={onLayout} style={{ opacity }}>
            {children}
          </Container>
        )}
      </Transition>
    );
  }
}

const Container = Animated.createAnimatedComponent(styled.View`
  padding: 0 0 20px 0;
`);

function getBgOpacityForState(state) {
  return state === 'active' ? 1 : state === 'checked' ? 0.5 : 0;
}

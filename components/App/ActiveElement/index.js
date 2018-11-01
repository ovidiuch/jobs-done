import { func, node } from 'prop-types';
import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { stepStateType } from '../../shared/propTypes';
import { Transition, QUICK_TRANS_TIME } from '../../shared/Transition';

export class ActiveElement extends Component {
  static propTypes = {
    children: node.isRequired,
    state: stepStateType.isRequired,
    onLayout: func.isRequired
  };

  shouldComponentUpdate(prevProps) {
    // Deep compare props (including children)
    return !isEqual(this.props, prevProps);
  }

  render() {
    const { children, state, onLayout } = this.props;

    return (
      <Transition
        duration={QUICK_TRANS_TIME}
        value={getBgOpacityForState(state)}
      >
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

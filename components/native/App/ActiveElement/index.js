import { func, node } from 'prop-types';
import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { stepState } from '../../shared/prop-types';

export class ActiveElement extends Component {
  static propTypes = {
    children: node.isRequired,
    state: stepState.isRequired,
    onLayout: func.isRequired
  };

  state = {
    opacity: new Animated.Value(getBgOpacityForState(this.props.state))
  };

  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state) {
      Animated.timing(this.state.opacity, {
        toValue: getBgOpacityForState(this.props.state),
        duration: 600
      }).start();
    }
  }

  render() {
    const { children, state, onLayout } = this.props;
    const { opacity } = this.state;

    return (
      <AnimatedContainer state={state} onLayout={onLayout} style={{ opacity }}>
        {children}
      </AnimatedContainer>
    );
  }
}

const Container = styled.View`
  padding: 0 0 20px 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

function getBgOpacityForState(state) {
  return state === 'active' ? 1 : state === 'checked' ? 0.5 : 0;
}

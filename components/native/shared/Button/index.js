import { string, bool, func } from 'prop-types';
import React, { Component } from 'react';
import {
  Platform,
  Animated,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import styled from 'styled-components/native';

export class Button extends Component {
  static propTypes = {
    label: string.isRequired,
    disabled: bool,
    onPress: func
  };

  static defaultProps = {
    disabled: false
  };

  state = {
    opacity: new Animated.Value(getOpacityForProps(this.props))
  };

  componentDidUpdate(prevProps) {
    if (this.props.disabled !== prevProps.disabled) {
      Animated.timing(this.state.opacity, {
        toValue: getOpacityForProps(this.props),
        duration: 600
      }).start();
    }
  }

  render() {
    const { disabled, onPress } = this.props;

    if (disabled) {
      return this.renderLabel();
    }

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View>{this.renderLabel()}</View>
      </TouchableWithoutFeedback>
    );
  }

  renderLabel() {
    const { label } = this.props;
    const { opacity } = this.state;

    const color = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(217, 223, 247, 0.4)', 'rgba(217, 223, 247, 0.8)']
    });

    return (
      <Container>
        <AnimatedLabel style={{ color }}>{label.toUpperCase()}</AnimatedLabel>
      </Container>
    );
  }
}

function getOpacityForProps({ disabled }) {
  return disabled ? 0 : 1;
}

const Container = styled.View`
  height: 52px;
  padding: 0 20px;
  border-radius: 5px;
  background: rgba(0, 9, 21, 0.5);
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: 500;
  line-height: 52px;
  letter-spacing: 1px;
`;

const WebLabel = Label.extend`
  user-select: none;
`;

const AnimatedLabel = Animated.createAnimatedComponent(
  Platform.OS === 'web' ? WebLabel : Label
);

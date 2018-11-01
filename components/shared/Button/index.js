import { string, bool, func } from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Platform,
  Animated,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import styled from 'styled-components/native';
import { Transition, QUICK_TRANS_TIME } from '../../shared/Transition';

export class Button extends PureComponent {
  static propTypes = {
    label: string.isRequired,
    disabled: bool,
    onPress: func
  };

  static defaultProps = {
    disabled: false
  };

  render() {
    const { disabled, onPress } = this.props;

    return (
      <Transition
        duration={QUICK_TRANS_TIME}
        value={getOpacityForState(disabled)}
      >
        {opacity => {
          const color = opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [
              'rgba(217, 223, 247, 0.4)',
              'rgba(217, 223, 247, 0.8)'
            ]
          });

          if (disabled) {
            return this.renderLabel(color);
          }

          return (
            <TouchableWithoutFeedback onPress={onPress}>
              <View>{this.renderLabel(color)}</View>
            </TouchableWithoutFeedback>
          );
        }}
      </Transition>
    );
  }

  renderLabel(color) {
    const { label } = this.props;

    return (
      <Container>
        <AnimatedLabel style={{ color }}>{label}</AnimatedLabel>
      </Container>
    );
  }
}

function getOpacityForState(disabled) {
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

const WebLabel = styled(Label)`
  user-select: none;
`;

const AnimatedLabel = Animated.createAnimatedComponent(
  Platform.OS === 'web' ? WebLabel : Label
);

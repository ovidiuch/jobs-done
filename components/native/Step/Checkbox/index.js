import { bool } from 'prop-types';
import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

export class Checkbox extends Component {
  static propTypes = {
    checked: bool.isRequired
  };

  state = {
    anim: new Animated.Value(getAnimValueForProps(this.props))
  };

  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      Animated.timing(this.state.anim, {
        toValue: getAnimValueForProps(this.props),
        duration: 600
      }).start();
    }
  }

  render() {
    const { checked } = this.props;
    const { anim } = this.state;

    const top = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [22, 18]
    });
    const scale = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1]
    });
    const checkStyle = [
      { top },
      { opacity: anim },
      {
        transform: [
          { rotateZ: '-50deg' },
          { scaleX: scale },
          { scaleY: scale },
          { perspective: 1000 }
        ]
      }
    ];

    return (
      <Bg>
        <AnimatedCheck checked={checked} style={checkStyle}>
          <ShortBar />
          <LongBar />
        </AnimatedCheck>
      </Bg>
    );
  }
}

const Bg = styled.View`
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: rgba(0, 9, 21, 0.3);
`;

const Check = styled.View`
  position: absolute;
  left: 10px;
  margin: -3px 0 0 0;
  width: 32px;
  height: 16px;
`;

const AnimatedCheck = Animated.createAnimatedComponent(Check);

const ShortBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 16px;
  background: rgba(217, 223, 247, 1);
`;

const LongBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 6px;
  width: 6px;
  width: 26px;
  height: 6px;
  background: rgba(217, 223, 247, 1);
`;

function getAnimValueForProps({ checked }) {
  return checked ? 1 : 0;
}
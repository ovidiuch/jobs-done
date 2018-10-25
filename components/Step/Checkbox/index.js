import { bool } from 'prop-types';
import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Transition, QUICK_TRANS_TIME } from '../../shared/Transition';

export class Checkbox extends Component {
  static propTypes = {
    checked: bool.isRequired
  };

  render() {
    const { checked } = this.props;

    return (
      <Bg>
        <Transition
          duration={QUICK_TRANS_TIME}
          value={getAnimValueForState(checked)}
        >
          {anim => {
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
              <Check checked={checked} style={checkStyle}>
                <ShortBar />
                <LongBar />
              </Check>
            );
          }}
        </Transition>
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

const Check = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  left: 10px;
  margin: -3px 0 0 0;
  width: 32px;
  height: 16px;
`);

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

function getAnimValueForState(checked) {
  return checked ? 1 : 0;
}

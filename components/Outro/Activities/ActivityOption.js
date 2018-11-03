import { string, func } from 'prop-types';
import React, { Component } from 'react';
import { Platform, Animated } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../../shared/text';
import { Button } from '../../shared/Button';
import { Transition, QUICK_TRANS_TIME } from '../../shared/Transition';
import { getRandomCheerLabel } from './cheers';

export class ActivityOption extends Component {
  state = {
    cheerLabel: null
  };

  handleSelect = () => {
    const { label, selectedActivity, onSelect } = this.props;

    if (selectedActivity === label) {
      onSelect(null);
    } else {
      this.setState({ cheerLabel: getRandomCheerLabel() }, () =>
        onSelect(label)
      );
    }
  };

  handleAnimationDone = () => {
    if (!this.isSelected()) {
      this.setState({
        cheerLabel: null
      });
    }
  };

  render() {
    const { selectedActivity } = this.props;
    const isSelected = this.isSelected();

    return (
      <Transition
        duration={QUICK_TRANS_TIME}
        value={isSelected || !selectedActivity ? 1 : 0.4}
      >
        {opacity => (
          <Transition
            duration={QUICK_TRANS_TIME}
            value={isSelected ? 1 : 0}
            onDone={this.handleAnimationDone}
          >
            {cheerOpacity => this.renderAnimated({ opacity, cheerOpacity })}
          </Transition>
        )}
      </Transition>
    );
  }

  renderAnimated({ opacity, cheerOpacity }) {
    const { label } = this.props;
    const { cheerLabel } = this.state;

    const cheerMarginBottom = cheerOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [-16, 0]
    });

    return (
      <Container style={{ opacity }}>
        {cheerLabel && (
          <CheerTooltip
            style={{ opacity: cheerOpacity, marginBottom: cheerMarginBottom }}
          >
            <CheerLabel numberOfLines={1}>{cheerLabel}</CheerLabel>
          </CheerTooltip>
        )}
        <Button label={label} onPress={this.handleSelect} />
      </Container>
    );
  }

  isSelected() {
    const { label, selectedActivity } = this.props;

    return selectedActivity === label;
  }
}

ActivityOption.propTypes = {
  label: string.isRequired,
  selectedActivity: string,
  onSelect: func.isRequired
};

const Container = Animated.createAnimatedComponent(styled.View`
  position: relative;
  margin: 16px 16px 0 0;
`);

const CheerTooltip = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  right: 8px;
  bottom: 60px;
  margin: 0;
  padding: 0 16px;
  background: rgba(217, 223, 247, 0.7);
  border-radius: 5px;
  ${Platform.OS === 'web' && 'user-select: none;'};
`);

const CheerLabel = styled(Text)`
  color: rgba(0, 9, 21, 0.8);
  line-height: 40px;
`;

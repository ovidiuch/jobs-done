import { string, func } from 'prop-types';
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../../shared/text';
import { Transition } from '../../shared/Transition';
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

  render() {
    const { label, selectedActivity } = this.props;
    const isSelected = selectedActivity === label;

    return (
      <Transition duration={600} value={isSelected ? 1 : 0}>
        {cheerOpacity => (
          <Transition
            duration={600}
            value={isSelected || !selectedActivity ? 1 : 0.5}
          >
            {rootOpacity => this.renderAnimated({ rootOpacity, cheerOpacity })}
          </Transition>
        )}
      </Transition>
    );
  }

  renderAnimated({ rootOpacity, cheerOpacity }) {
    const { label } = this.props;
    const { cheerLabel } = this.state;

    const height = cheerOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 40]
    });

    return (
      <Container style={{ opacity: rootOpacity }}>
        <TouchableWithoutFeedback onPress={this.handleSelect}>
          <Label>{label}</Label>
        </TouchableWithoutFeedback>

        <CheerContainer style={{ height, opacity: cheerOpacity }}>
          <CheerLabel>{cheerLabel}</CheerLabel>
        </CheerContainer>
      </Container>
    );
  }
}

ActivityOption.propTypes = {
  label: string.isRequired,
  selectedActivity: string,
  onSelect: func.isRequired
};

const Container = Animated.createAnimatedComponent(styled.View``);

const Label = Text.extend`
  line-height: 24px;
  margin: 0 16px 0 0;
  line-height: 40px;
  white-space: nowrap;
`;

const CheerContainer = Animated.createAnimatedComponent(styled.View`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 0px;
  margin-right: auto;
  opacity: 0;
`);

const CheerLabel = Label.extend`
  flex: 1;
  background: rgba(217, 223, 247, 0.12);
  border-radius: 5px;
  padding: 0 16px;
`;

import { string, func } from 'prop-types';
import React, { Component } from 'react';
import { Platform, Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../../shared/text';
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

  render() {
    const { label, selectedActivity } = this.props;
    const isSelected = selectedActivity === label;

    return (
      <Transition
        duration={QUICK_TRANS_TIME}
        value={isSelected || !selectedActivity ? 1 : 0.4}
      >
        {opacity => this.renderAnimated({ isSelected, opacity })}
      </Transition>
    );
  }

  renderAnimated({ isSelected, opacity }) {
    const { label } = this.props;
    const { cheerLabel } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.handleSelect}>
        <Container style={{ opacity }}>
          <ActivityLabel>
            <Arrow>→</Arrow> {label}
          </ActivityLabel>
          {isSelected && <CheerLabel>{cheerLabel}</CheerLabel>}
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}

ActivityOption.propTypes = {
  label: string.isRequired,
  selectedActivity: string,
  onSelect: func.isRequired
};

const Container = Animated.createAnimatedComponent(styled.View`
  display: flex;
  flex-direction: row;
`);

const Label = styled(Text)`
  line-height: 24px;
  margin: 0;
  line-height: 40px;
  ${Platform.OS === 'web' && 'user-select: none;'};
`;

const Arrow = styled(Text)`
  padding-right: 4px;
  opacity: 0.5;
`;

const ActivityLabel = styled(Label)`
  flex: 1;
  padding: 0 16px 0 0;
`;

const CheerLabel = styled(Label)`
  margin: 0;
  padding: 0 16px;
  background: rgba(217, 223, 247, 0.12);
  border-radius: 5px;
`;

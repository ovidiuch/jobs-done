import { string, func } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

export class Outro extends Component {
  static propTypes = {
    onChildUpdate: func.isRequired
  };

  state = {
    selectedActivityType: null
  };

  handleSelectActivityType = activityType => {
    this.setState(
      { selectedActivityType: activityType },
      this.props.onChildUpdate
    );
  };

  render() {
    const { selectedActivityType } = this.state;

    return (
      <Container>
        <h2>Shutdown complete.</h2>
        <p>
          Time to unwind. Let work sink in your subconscious until tomorrow.
        </p>
        <p>What do you feel like doing this evening?</p>
        <ActivityTypeButtons>
          <ActivityTypeButton
            label="Social"
            selectedActivityType={selectedActivityType}
            selectActivityType={this.handleSelectActivityType}
          />
          <ActivityTypeButton
            label="Physical"
            selectedActivityType={selectedActivityType}
            selectActivityType={this.handleSelectActivityType}
          />
          <ActivityTypeButton
            label="Leisure"
            selectedActivityType={selectedActivityType}
            selectActivityType={this.handleSelectActivityType}
          />
        </ActivityTypeButtons>
        <ActivityOptions label={selectedActivityType} />
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 56px 20px 0 20px;
`;

const ActivityTypeButtons = styled.div`
  margin: 0 0 4px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function ActivityTypeButton({
  label,
  selectedActivityType,
  selectActivityType
}) {
  const isSelected = selectedActivityType === label;

  return (
    <>
      <ActivityTypeButtonContainer
        selectedActivityType={selectedActivityType}
        label={label}
      >
        <Button onClick={() => selectActivityType(isSelected ? null : label)}>
          {label}
        </Button>
      </ActivityTypeButtonContainer>
    </>
  );
}

ActivityTypeButton.propTypes = {
  label: string.isRequired,
  selectedActivityType: string,
  selectActivityType: func.isRequired
};

const ActivityTypeButtonContainer = styled.div`
  margin: 0 16px 16px 0;
  opacity: ${props =>
    !props.selectedActivityType || props.selectedActivityType === props.label
      ? 1
      : 0.3};
  transition: opacity 0.6s;
`;

function ActivityOptions({ label }) {
  switch (label) {
    case 'Social':
      return (
        <ul>
          <li>Attend an event</li>
          <li>Take someone to dinner</li>
          <li>Hang out with a friend</li>
          <li>Call someone dear</li>
        </ul>
      );
    case 'Physical':
      return (
        <ul>
          <li>Go for a run</li>
          <li>Go for a swim</li>
          <li>Take a long walk</li>
          <li>Work out</li>
        </ul>
      );
    case 'Leisure':
      return (
        <ul>
          <li>Read a book</li>
          <li>Play a game</li>
          <li>Go see a play</li>
          <li>Watch a movie</li>
        </ul>
      );
    default:
      return null;
  }
}

ActivityOptions.propTypes = {
  label: string
};

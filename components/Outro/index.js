import { string, func, node } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

export class Outro extends Component {
  static propTypes = {
    selectedActivityType: string,
    selectActivityType: func.isRequired
  };

  render() {
    const { selectedActivityType, selectActivityType } = this.props;

    return (
      <Container key={selectedActivityType}>
        <h2>Shutdown complete.</h2>
        <p>
          Time to unwind. Let work sink in your subconscious until tomorrow.
        </p>
        <p>What do you feel like doing this evening?</p>
        <ActivityType
          label="Social"
          selectedActivityType={selectedActivityType}
          selectActivityType={selectActivityType}
        >
          <ul>
            <li>Attend an event</li>
            <li>Take someone to dinner</li>
            <li>Hang out with a friend</li>
            <li>Call someone dear</li>
          </ul>
        </ActivityType>
        <ActivityType
          label="Physical"
          selectedActivityType={selectedActivityType}
          selectActivityType={selectActivityType}
        >
          <ul>
            <li>Go for a run</li>
            <li>Go for a swim</li>
            <li>Take a long walk</li>
            <li>Work out</li>
          </ul>
        </ActivityType>
        <ActivityType
          label="Leisure"
          selectedActivityType={selectedActivityType}
          selectActivityType={selectActivityType}
        >
          <ul>
            <li>Read a book</li>
            <li>Play a game</li>
            <li>Go see a play</li>
            <li>Watch a movie</li>
          </ul>
        </ActivityType>
      </Container>
    );
  }
}

function ActivityType({
  label,
  selectedActivityType,
  selectActivityType,
  children
}) {
  const isSelected = selectedActivityType === label;

  return (
    <>
      <p>
        <Button disabled={isSelected} onClick={() => selectActivityType(label)}>
          {label}
        </Button>
      </p>
      {isSelected && children}
    </>
  );
}

ActivityType.propTypes = {
  label: string.isRequired,
  selectedActivityType: string,
  selectActivityType: func.isRequired,
  children: node.isRequired
};

const Container = styled.div`
  padding: 56px 20px 0 20px;
`;

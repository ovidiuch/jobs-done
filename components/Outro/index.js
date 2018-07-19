import { bool, string, func, node } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';
import { Button } from '../Button';
import jobsDoneSound from './jobs-done.mp3';

export class Outro extends Component {
  static propTypes = {
    isActive: bool.isRequired
  };

  state = {
    selectedActivityType: null
  };

  handleSelectActivityType = activityType => {
    this.setState({
      selectedActivityType: activityType
    });
  };

  render() {
    const { isActive } = this.props;
    const { selectedActivityType } = this.state;

    return (
      <Container>
        <p>
          <strong>Jobs done!</strong>
        </p>
        <p>
          Time to unwind. <em>Forget</em> about work until tomorrow.
        </p>
        <p>What do you feel like doing this evening? Something...</p>
        <ActivityType
          label="Social"
          selectedActivityType={selectedActivityType}
          selectActivityType={this.handleSelectActivityType}
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
          selectActivityType={this.handleSelectActivityType}
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
          selectActivityType={this.handleSelectActivityType}
        >
          <ul>
            <li>Read a book</li>
            <li>Play a game</li>
            <li>Go see a play</li>
            <li>Watch a movie</li>
          </ul>
        </ActivityType>
        {isActive && (
          <Sound url={jobsDoneSound} playStatus={Sound.status.PLAYING} />
        )}
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
  padding: 56px 16px 8px 16px;
`;

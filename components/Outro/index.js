import React, { Component } from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';
import { Button } from '../Button';
import jobsDoneSound from './jobs-done.mp3';

export class Outro extends Component {
  render() {
    const { isActive, onStart } = this.props;

    return (
      <Container>
        <p>
          <strong>Jobs done!</strong>
        </p>
        <p>
          Time to unwind. Forget about work until tomorrow. Here's some ideas
          for this evening:
        </p>
        <ul>
          <li>Attend a social event</li>
          <li>Go for a run</li>
          <li>Take someone to dinner</li>
          <li>Read a book</li>
          <li>Go see a play</li>
          <li>Play a game</li>
          <li>Take a long walk</li>
          <li>Go for a swim</li>
          <li>Watch a movie</li>
        </ul>
        {isActive && (
          <Sound url={jobsDoneSound} playStatus={Sound.status.PLAYING} />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 56px 16px 8px 16px;
`;

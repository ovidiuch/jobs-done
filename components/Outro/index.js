import { bool } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';
import jobsDoneSound from './jobs-done.mp3';

export class Outro extends Component {
  static propTypes = {
    isActive: bool.isRequired
  };

  render() {
    const { isActive } = this.props;

    return (
      <Container>
        <p>
          <strong>Jobs done!</strong>
        </p>
        <p>
          Time to unwind. <em>Forget</em> about work until tomorrow. What do you
          feel like doing this evening?
        </p>
        <p>Social</p>
        <ul>
          <li>Attend an event</li>
          <li>Take someone to dinner</li>
          <li>Hang out with a friend</li>
          <li>Call someone dear</li>
        </ul>
        <p>Physical</p>
        <ul>
          <li>Go for a run</li>
          <li>Go for a swim</li>
          <li>Take a long walk</li>
          <li>Work out</li>
        </ul>
        <p>Leisure</p>
        <ul>
          <li>Read a book</li>
          <li>Play a game</li>
          <li>Go see a play</li>
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

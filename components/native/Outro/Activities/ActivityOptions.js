import { string } from 'prop-types';
import React from 'react';

export function ActivityOptions({ label }) {
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

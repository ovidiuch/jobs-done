import { string, func } from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';
import { ActivityOption } from './ActivityOption';

const ACTIVITY_OPTIONS = {
  Social: [
    'Attend an event',
    'Take someone to dinner',
    'Hang out with a friend',
    'Call someone dear'
  ],
  Physical: ['Go for a run', 'Go for a swim', 'Take a long walk', 'Work out'],
  Leisure: ['Read a book', 'Play a game', 'Go see a play', 'Watch a movie']
};

export function ActivityOptions({
  selectedActivityType,
  selectedActivity,
  onSelectActivity
}) {
  if (!selectedActivityType) {
    return null;
  }

  const activities = ACTIVITY_OPTIONS[selectedActivityType];

  return (
    <List>
      {activities.map((activity, index) => (
        <ActivityOption
          key={index}
          label={activity}
          selectedActivity={selectedActivity}
          onSelect={onSelectActivity}
        />
      ))}
    </List>
  );
}

ActivityOptions.propTypes = {
  selectedActivityType: string,
  selectedActivity: string,
  onSelectActivity: func
};

const List = styled.View`
  width: 100%;
`;

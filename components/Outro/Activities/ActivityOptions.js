import { string, func } from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';
import { activitiesType } from '../../shared/propTypes';
import { ActivityOption } from './ActivityOption';

export function ActivityOptions({
  activities,
  selectedActivityType,
  selectedActivity,
  onSelectActivity
}) {
  if (!selectedActivityType) {
    return null;
  }

  const activityOptions = activities[selectedActivityType];

  return (
    <List>
      {activityOptions.map((activity, index) => (
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
  activities: activitiesType.isRequired,
  selectedActivityType: string,
  selectedActivity: string,
  onSelectActivity: func
};

const List = styled.View`
  width: 100%;
  padding: 12px 0 0 0;
`;

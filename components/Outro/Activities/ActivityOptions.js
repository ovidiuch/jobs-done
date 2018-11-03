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
    <Container>
      <Options>
        {activityOptions.map((activity, index) => (
          <ActivityOption
            key={index}
            label={activity}
            selectedActivity={selectedActivity}
            onSelect={onSelectActivity}
          />
        ))}
      </Options>
    </Container>
  );
}

ActivityOptions.propTypes = {
  activities: activitiesType.isRequired,
  selectedActivityType: string,
  selectedActivity: string,
  onSelectActivity: func
};

const Container = styled.View`
  margin: 16px 0 0 0;
  border-style: solid;
  border-top-width: 1px;
  border-top-color: rgba(217, 223, 247, 0.1);
`;

const Options = styled.View`
  margin: 0 -16px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

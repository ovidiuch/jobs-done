import React, { Component } from 'react';
import styled from 'styled-components/native';
import { activitiesType } from '../../shared/propTypes';
import { ActivityOptions } from './ActivityOptions';
import { ActivityTypeButton } from './ActivityTypeButton';

export class Activities extends Component {
  static propTypes = {
    activities: activitiesType.isRequired
  };

  state = {
    selectedActivityType: null,
    selectedActivity: null
  };

  handleSelectActivityType = activityType => {
    this.setState({
      selectedActivityType: activityType,
      selectedActivity: null
    });
  };

  handleSelectActivity = activity => {
    this.setState({ selectedActivity: activity });
  };

  render() {
    const { activities } = this.props;
    const { selectedActivityType, selectedActivity } = this.state;

    return (
      <Container>
        <ActivityTypeButtons>
          {Object.keys(activities).map((activity, idx) => (
            <ActivityTypeButton
              key={idx}
              label={activity}
              selectedActivityType={selectedActivityType}
              selectActivityType={this.handleSelectActivityType}
            />
          ))}
        </ActivityTypeButtons>
        <ActivityOptions
          key={selectedActivityType}
          activities={activities}
          selectedActivityType={selectedActivityType}
          selectedActivity={selectedActivity}
          onSelectActivity={this.handleSelectActivity}
        />
      </Container>
    );
  }
}

const Container = styled.View``;

const ActivityTypeButtons = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -16px -16px 0;
`;

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
      <React.Fragment>
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
          activities={activities}
          selectedActivityType={selectedActivityType}
          selectedActivity={selectedActivity}
          onSelectActivity={this.handleSelectActivity}
        />
      </React.Fragment>
    );
  }
}

const ActivityTypeButtons = styled.View`
  margin: 0 -16px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

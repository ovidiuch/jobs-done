import React, { Component } from 'react';
import styled from 'styled-components/native';
import { ActivityOptions } from './ActivityOptions';
import { ActivityTypeButton } from './ActivityTypeButton';

export class Activities extends Component {
  static propTypes = {};

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
    const { selectedActivityType, selectedActivity } = this.state;

    return (
      <React.Fragment>
        <ActivityTypeButtons>
          <ActivityTypeButton
            label="Social"
            selectedActivityType={selectedActivityType}
            selectActivityType={this.handleSelectActivityType}
          />
          <ActivityTypeButton
            label="Physical"
            selectedActivityType={selectedActivityType}
            selectActivityType={this.handleSelectActivityType}
          />
          <ActivityTypeButton
            label="Leisure"
            selectedActivityType={selectedActivityType}
            selectActivityType={this.handleSelectActivityType}
          />
        </ActivityTypeButtons>
        <ActivityOptions
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

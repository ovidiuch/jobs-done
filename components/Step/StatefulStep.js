import React, { Component } from 'react';
import { Step } from '.';

export class StatefulStep extends Component {
  state = {
    state: 'active'
  };

  handleSelect = () => {
    this.setState({
      state: this.state.state === 'active' ? 'checked' : 'active'
    });
  };

  render() {
    return (
      <Step
        stepIndex={0}
        step={{
          name: 'Reply to (or schedule) anything urgent',
          urls: [
            'https://mail.google.com/mail/',
            'slack://react-cosmos.slack.com/messages/general/'
          ]
        }}
        state={this.state.state}
        onSelect={this.handleSelect}
        mobileViewport={true}
      />
    );
  }
}

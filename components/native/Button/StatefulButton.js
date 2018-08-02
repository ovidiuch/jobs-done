import React, { Component } from 'react';
import { Button } from '.';

export class StatefulButton extends Component {
  state = {
    disabled: false
  };

  handlePress = () => {
    this.setState({
      disabled: true
    });

    setTimeout(() => {
      this.setState({
        disabled: false
      });
    }, 1000);
  };

  render() {
    return (
      <Button
        label="Start"
        disabled={this.state.disabled}
        onPress={this.handlePress}
      />
    );
  }
}

import React, { Component } from 'react';
import { Checkbox } from '.';

export class StatefulCheckbox extends Component {
  state = {
    checked: false
  };

  handleSelect = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    return (
      <Checkbox checked={this.state.checked} onSelect={this.handleSelect} />
    );
  }
}

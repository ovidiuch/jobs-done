import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
      <TouchableWithoutFeedback onPress={this.handleSelect}>
        <View>
          <Checkbox checked={this.state.checked} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

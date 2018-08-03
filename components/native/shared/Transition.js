import { number, func } from 'prop-types';
import { Component } from 'react';
import { Animated } from 'react-native';

export class Transition extends Component {
  static propTypes = {
    children: func.isRequired,
    getValue: func.isRequired,
    duration: number.isRequired
  };

  state = {
    value: new Animated.Value(this.props.getValue())
  };

  componentDidUpdate() {
    const { getValue, duration } = this.props;
    const toValue = getValue();

    if (toValue !== this.state.value) {
      Animated.timing(this.state.value, {
        toValue,
        duration
      }).start();
    }
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return children(value);
  }
}

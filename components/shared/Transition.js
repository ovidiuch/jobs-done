import { number, func } from 'prop-types';
import { PureComponent } from 'react';
import { Animated } from 'react-native';

export const QUICK_TRANS_TIME = 600;

export class Transition extends PureComponent {
  static propTypes = {
    children: func.isRequired,
    value: number.isRequired,
    duration: number.isRequired,
    onDone: func
  };

  state = {
    valueAnim: new Animated.Value(this.props.value)
  };

  componentDidUpdate(prevProps) {
    const { value, duration, onDone } = this.props;

    if (value !== prevProps.value || duration !== prevProps.duration) {
      Animated.timing(this.state.valueAnim, {
        toValue: value,
        duration
      }).start(onDone);
    }
  }

  render() {
    const { children } = this.props;
    const { valueAnim } = this.state;

    return children(valueAnim);
  }
}

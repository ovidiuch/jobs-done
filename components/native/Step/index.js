import { number, string, func, arrayOf } from 'prop-types';
import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import styled from 'styled-components/native';
import { stepState } from '../shared/prop-types';
import { Checkbox } from './Checkbox';
import { Link } from './Link';

export class Step extends Component {
  static propTypes = {
    stepIndex: number.isRequired,
    name: string.isRequired,
    urls: arrayOf(string).isRequired,
    state: stepState.isRequired,
    onSelect: func.isRequired
  };

  state = {
    bgOpacity: new Animated.Value(getBgOpacityForState(this.props.state)),
    borderRadius: getBorderRadiusForDeviceWidth()
  };

  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state) {
      Animated.timing(this.state.bgOpacity, {
        toValue: getBgOpacityForState(this.props.state),
        duration: 600
      }).start();
    }
  }

  handleLayout = () => {
    const borderRadius = getBorderRadiusForDeviceWidth();

    if (borderRadius !== this.state.borderRadius) {
      this.setState({
        borderRadius
      });
    }
  };

  handleSelect = () => {
    const { stepIndex, state, onSelect } = this.props;

    if (state !== 'disabled') {
      onSelect(stepIndex);
    }
  };

  render() {
    const { state } = this.props;

    return state === 'disabled' ? (
      this.renderStep()
    ) : (
      <TouchableWithoutFeedback onPress={this.handleSelect}>
        {this.renderStep()}
      </TouchableWithoutFeedback>
    );
  }

  renderStep() {
    const { name, urls, state } = this.props;
    const { bgOpacity, borderRadius } = this.state;

    const backgroundColor = bgOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(217, 223, 247, 0)', 'rgba(217, 223, 247, 0.12)']
    });

    return (
      <AnimatedContainer
        onLayout={this.handleLayout}
        style={{ backgroundColor, borderRadius }}
      >
        <Left>
          <Name>{name}</Name>
          <Urls>
            {urls.map(url => (
              <Url key={url}>
                <Link href={url} disabled={state !== 'active'} />
              </Url>
            ))}
          </Urls>
        </Left>
        <ButtonContainer>
          <Checkbox checked={state === 'checked'} />
        </ButtonContainer>
      </AnimatedContainer>
    );
  }
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 0 20px 16px 20px;
`;

const WebContainer = Container.extend`
  user-select: none;
`;

const AnimatedContainer = Animated.createAnimatedComponent(
  Platform.OS === 'web' ? WebContainer : Container
);

const Left = styled.View`
  flex: 1;
  padding-right: 16px;
`;

const Name = styled.Text`
  margin: 16px 0 4px 0;
  color: rgba(217, 223, 247, 0.8);
  font-size: 18px;
  line-height: 24px;
`;

const Urls = styled.View`
  display: flex;
  flex-direction: column;
`;

const Url = styled.View`
  margin: 0 auto 0 0;
`;

const ButtonContainer = styled.View`
  flex-shrink: 0;
  margin: 16px 0 0 0;
`;

function getBgOpacityForState(state) {
  return state === 'active' ? 1 : 0;
}

function getBorderRadiusForDeviceWidth() {
  return Dimensions.get('window').width > 552 ? 5 : 0;
}

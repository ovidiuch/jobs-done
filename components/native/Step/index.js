import { number, string, func, arrayOf, oneOf } from 'prop-types';
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Checkbox } from '../Checkbox';
import { Url } from '../Url';

export class Step extends Component {
  static propTypes = {
    stepIndex: number.isRequired,
    name: string.isRequired,
    urls: arrayOf(string).isRequired,
    state: oneOf(['active', 'checked', 'disabled']).isRequired,
    onSelect: func.isRequired
  };

  state = {
    bgOpacity: new Animated.Value(getBgOpacityForState(this.props.state))
  };

  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state) {
      Animated.timing(this.state.bgOpacity, {
        toValue: getBgOpacityForState(this.props.state),
        duration: 600
      }).start();
    }
  }

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
    const { bgOpacity } = this.state;

    const backgroundColor = bgOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(217, 223, 247, 0)', 'rgba(217, 223, 247, 0.12)']
    });

    return (
      <AnimatedContainer style={{ backgroundColor }}>
        <Left>
          <Name>{name}</Name>
          <Urls>
            {urls.map(url => (
              <UrlWrapper key={url}>
                <Url enabled={state === 'active'} url={url} />
              </UrlWrapper>
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

// FIXME: @media (min-width: 553px) {
//   border-radius: 5px;
// }
const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 0 20px 16px 20px;
  user-select: none;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

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

const UrlWrapper = styled.View`
  margin: 0 auto 0 0;
`;

const ButtonContainer = styled.View`
  flex-shrink: 0;
  margin: 16px 0 0 0;
`;

function getBgOpacityForState(state) {
  return state === 'active' ? 1 : 0;
}

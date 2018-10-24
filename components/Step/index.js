import { number, string, func, arrayOf, exact } from 'prop-types';
import React from 'react';
import { Platform, Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { debounce } from 'lodash';
import { UnmountAwareComponent } from '../shared/UnmountAwareComponent';
import { stepState } from '../shared/prop-types';
import { Transition } from '../shared/Transition';
import { Checkbox } from './Checkbox';
import { Link } from './Link';

export class Step extends UnmountAwareComponent {
  static propTypes = {
    stepIndex: number.isRequired,
    name: string.isRequired,
    urls: arrayOf(string).isRequired,
    state: stepState.isRequired,
    rootViewport: exact({
      width: number.isRequired,
      height: number.isRequired
    }).isRequired,
    onSelect: func.isRequired
  };

  static defaultProps = {
    rootViewport: {
      width: 320,
      height: 568
    }
  };

  state = {
    linksEnabled: this.props.state === 'active'
  };

  componentDidUpdate(prevProps, prevState) {
    const linksEnabled = this.props.state === 'active';

    // Why is linksEnabled not derived from this.props.state in the render
    // method? Good question!
    // Because users shouldn't be able to press links from checked steps. And
    // the following used to happen:
    //   1. A disabled link from a checked step was pressed
    //   2. The checked step was activated
    //   3. The press event would only now reach the link (which was now enabled)
    //   4. The link was opened as the checked step was activating
    if (linksEnabled !== prevState.linksEnabled) {
      setTimeout(() => {
        if (!this.unmounted) {
          this.setState({ linksEnabled });
        }
      }, 500);
    }
  }

  // Prevent step from toggling itself on and off on press, because sometimes
  // two press events fire rapidly one after another (for unknown reasons).
  handleSelect = debounce(
    () => {
      const { stepIndex, state, onSelect } = this.props;

      if (state !== 'disabled') {
        onSelect(stepIndex);
      }
    },
    500,
    // Fire synchronously on the first call
    { leading: true, trailing: false }
  );

  render() {
    const { state } = this.props;

    return (
      <Transition duration={600} value={getBgOpacityForState(state)}>
        {bgOpacity => {
          return state === 'disabled' ? (
            this.renderStep(bgOpacity)
          ) : (
            <TouchableWithoutFeedback onPress={this.handleSelect}>
              {this.renderStep(bgOpacity)}
            </TouchableWithoutFeedback>
          );
        }}
      </Transition>
    );
  }

  renderStep(bgOpacity) {
    const { name, urls, state, rootViewport } = this.props;
    const { linksEnabled } = this.state;

    const backgroundColor = bgOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(217, 223, 247, 0)', 'rgba(217, 223, 247, 0.12)']
    });
    const borderRadius = getBorderRadiusForViewport(rootViewport);

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
                <Link href={url} disabled={!linksEnabled} />
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

const WebContainer = styled(Container)`
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

function getBorderRadiusForViewport(viewport) {
  return viewport.width > 552 ? 5 : 0;
}

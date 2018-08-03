import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Transition } from '../shared/Transition';
import { Intro } from '../Intro';
import { Outro } from '../Outro';
import { Step } from '../Step';
import { Layout } from './Layout';
import { ActiveElement } from './ActiveElement';
import { steps } from './data';

export class App extends Component {
  state = {
    activeStepIndex: 0,
    rootViewport: undefined,
    elHeights: {}
  };

  componentDidMount() {
    if (typeof global.addEventListener === 'function') {
      // window isn't available on the server side, but nor is componentDidMount
      // called on the server
      global.addEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    if (typeof global.removeEventListener === 'function') {
      // window isn't available on the server side, but nor is componentWillUnmount
      // called on the server
      global.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  handleParentLayout = e => {
    const { width, height } = e.nativeEvent.layout;

    this.setState({
      rootViewport: { width, height }
    });
  };

  createElLayoutHandler = index => e => {
    const { elHeights } = this.state;
    const { height } = e.nativeEvent.layout;

    if (elHeights[index] === height) {
      return;
    }

    this.setState({
      elHeights: {
        ...elHeights,
        [index]: height
      }
    });
  };

  handleSelect = stepIndex => {
    const { activeStepIndex } = this.state;

    if (stepIndex === activeStepIndex) {
      this.handleNext();
    } else {
      this.setState({
        activeStepIndex: stepIndex
      });
    }
  };

  handlePrev = () => {
    const { activeStepIndex } = this.state;

    if (activeStepIndex > 0) {
      this.setState({
        activeStepIndex: activeStepIndex - 1
      });
    }
  };

  handleNext = () => {
    const { activeStepIndex } = this.state;

    if (activeStepIndex < getStepsNum() - 1) {
      this.setState({
        activeStepIndex: activeStepIndex + 1
      });
    }
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleNext();
    } else if (e.keyCode === 8) {
      this.handlePrev();
    }
  };

  render() {
    return (
      <Transition duration={1000} value={getYOffsetForState(this.state)}>
        {yOffset => (
          <Transition duration={2000} value={getOpacityForState(this.state)}>
            {opacity => this.renderAnimated({ yOffset, opacity })}
          </Transition>
        )}
      </Transition>
    );
  }

  renderAnimated({ yOffset, opacity }) {
    const { rootViewport, activeStepIndex } = this.state;

    const introStepIndex = 0;
    const outroStepIndex = getStepsNum() - 1;
    const isIntroActive = activeStepIndex === 0;
    const isOutroActive = activeStepIndex === outroStepIndex;

    const innerStyle = {
      transform: [{ translateY: yOffset }],
      opacity
    };

    return (
      <Layout onLayout={this.handleParentLayout}>
        <AnimatedInner style={innerStyle}>
          <ActiveElement
            key={0}
            state={isIntroActive ? 'active' : 'checked'}
            onLayout={this.createElLayoutHandler(introStepIndex)}
          >
            <Intro isActive={isIntroActive} onStart={this.handleNext} />
          </ActiveElement>
          {steps.map((step, index) => {
            // Account one index for Intro step
            const relIndex = index + 1;
            const isChecked = activeStepIndex > relIndex;
            const state =
              activeStepIndex === relIndex
                ? 'active'
                : isChecked
                  ? 'checked'
                  : 'disabled';

            return (
              <ActiveElement
                key={relIndex}
                state={state}
                onLayout={this.createElLayoutHandler(relIndex)}
              >
                <Step
                  {...step}
                  stepIndex={relIndex}
                  state={state}
                  rootViewport={rootViewport}
                  onSelect={this.handleSelect}
                />
              </ActiveElement>
            );
          })}
          <ActiveElement
            state={isOutroActive ? 'active' : 'disabled'}
            onLayout={this.createElLayoutHandler(outroStepIndex)}
          >
            <Outro />
          </ActiveElement>
        </AnimatedInner>
      </Layout>
    );
  }
}

function getStepsNum() {
  // Add two steps for Intro and Outro
  return steps.length + 2;
}

function getYOffsetForState({ rootViewport, elHeights, activeStepIndex }) {
  if (!isLayoutReady({ rootViewport, elHeights })) {
    return 0;
  }

  const isPortraitScreen = rootViewport.height > rootViewport.width;
  const baseOffset = isPortraitScreen ? 0 : Math.round(rootViewport.height / 2);
  const visibleElements = getVisibleElements({ elHeights, activeStepIndex });

  // In portrait mode, elements are aligned to bottom
  // In landscape mode, elements are aligned to center
  return (
    -baseOffset -
    visibleElements.reduce((total, nextHeight, index) => {
      const isLast = index === activeStepIndex;
      const toAdd =
        !isPortraitScreen && isLast ? Math.round(nextHeight / 2) : nextHeight;

      return total + toAdd;
    }, 0)
  );
}

function getOpacityForState({ rootViewport, elHeights }) {
  return isLayoutReady({ rootViewport, elHeights }) ? 1 : 0;
}

function isLayoutReady({ rootViewport, elHeights }) {
  // Wait until we now the parent's width/height
  if (!rootViewport) {
    return false;
  }

  // Wait until we now the layout of all steps
  // NOTE: This means all steps are rendered from the start
  if (Object.keys(elHeights).length < getStepsNum()) {
    return false;
  }

  return true;
}

function getVisibleElements({ elHeights, activeStepIndex }) {
  // Already checked elements and active element
  return Object.keys(elHeights)
    .sort()
    .slice(0, activeStepIndex + 1)
    .map(index => elHeights[index]);
}

const Inner = styled.View`
  position: absolute;
  top: 100%;
`;

const AnimatedInner = Animated.createAnimatedComponent(Inner);

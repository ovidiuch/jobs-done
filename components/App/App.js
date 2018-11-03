import React from 'react';
import memoize from 'fast-memoize';
import { number, func } from 'prop-types';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { UnmountAwareComponent } from '../shared/UnmountAwareComponent';
import { appDataType } from '../shared/propTypes';
import { Transition, QUICK_TRANS_TIME } from '../shared/Transition';
import { Intro } from '../Intro';
import { Outro } from '../Outro';
import { Step } from '../Step';
import { Layout } from './Layout';
import { ActiveElement } from './ActiveElement';

export class App extends UnmountAwareComponent {
  static propTypes = {
    appData: appDataType,
    activeStepIndex: number.isRequired,
    setActiveStepIndex: func.isRequired
  };

  state = {
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
    super.componentWillUnmount();

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

  createElLayoutHandler = memoize(index => e => {
    const { height } = e.nativeEvent.layout;
    const { elHeights } = this.state;

    if (!this.unmounted && elHeights[index] !== height) {
      this.setState({
        elHeights: {
          ...elHeights,
          [index]: height
        }
      });
    }
  });

  handleSelect = stepIndex => {
    const { activeStepIndex, setActiveStepIndex } = this.props;

    if (stepIndex === activeStepIndex) {
      this.handleNext();
    } else {
      setActiveStepIndex(stepIndex);
    }
  };

  handleSelectIntro = () => {
    this.props.setActiveStepIndex(0);
  };

  handlePrev = () => {
    const { activeStepIndex, setActiveStepIndex } = this.props;

    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  handleNext = () => {
    const {
      appData: { steps },
      activeStepIndex,
      setActiveStepIndex
    } = this.props;

    if (activeStepIndex < getStepsNum(steps) - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  handleKeyDown = e => {
    // DOWN arrow
    if (e.keyCode === 40) {
      this.handleNext();
      // UP arrow
    } else if (e.keyCode === 38) {
      this.handlePrev();
    }
  };

  render() {
    const {
      appData: { steps },
      activeStepIndex
    } = this.props;
    const { rootViewport, elHeights } = this.state;

    return (
      <Transition
        duration={2000}
        value={getOpacityForState({ steps, rootViewport, elHeights })}
      >
        {opacity => (
          <Transition
            duration={QUICK_TRANS_TIME}
            value={getYOffsetForState({
              steps,
              rootViewport,
              elHeights,
              activeStepIndex
            })}
          >
            {yOffset => this.renderAnimated({ yOffset, opacity })}
          </Transition>
        )}
      </Transition>
    );
  }

  renderAnimated({ yOffset, opacity }) {
    const { appData, activeStepIndex } = this.props;
    const { steps } = appData;
    const { rootViewport } = this.state;

    const introStepIndex = 0;
    const outroStepIndex = getStepsNum(steps) - 1;
    const isIntroActive = activeStepIndex === 0;
    const isOutroActive = activeStepIndex === outroStepIndex;
    const mobileViewport = isMobileViewport(rootViewport);

    const innerStyle = {
      transform: [{ translateY: yOffset }],
      opacity
    };

    return (
      <Layout onLayout={this.handleParentLayout}>
        <AnimatedInner style={innerStyle}>
          <ActiveElement
            key="intro"
            state={isIntroActive ? 'active' : 'checked'}
            onLayout={this.createElLayoutHandler(introStepIndex)}
          >
            {getIntroEl(isIntroActive, this.handleNext, this.handleSelectIntro)}
          </ActiveElement>
          {steps.map((step, idx) => {
            // Account one index for Intro step
            const stepIndex = idx + 1;
            const isChecked = activeStepIndex > stepIndex;
            const state =
              activeStepIndex === stepIndex
                ? 'active'
                : isChecked
                  ? 'checked'
                  : 'disabled';

            return (
              <ActiveElement
                key={stepIndex}
                state={state}
                onLayout={this.createElLayoutHandler(stepIndex)}
              >
                {getStepEl(
                  step,
                  stepIndex,
                  state,
                  mobileViewport,
                  this.handleSelect
                )}
              </ActiveElement>
            );
          })}
          <ActiveElement
            key="outro"
            state={isOutroActive ? 'active' : 'disabled'}
            onLayout={this.createElLayoutHandler(outroStepIndex)}
          >
            {getOutroEl(appData)}
          </ActiveElement>
        </AnimatedInner>
      </Layout>
    );
  }
}

const getIntroEl = memoize(
  // Memoization is done by shallow comparing every argument
  (isActive, onStart, onSelect) => (
    <Intro isActive={isActive} onStart={onStart} onSelect={onSelect} />
  )
);

const getOutroEl = memoize(
  // Memoization is done by shallow comparing every argument
  appData => <Outro appData={appData} />
);

const getStepEl = memoize(
  // Memoization is done by shallow comparing every argument
  (step, stepIndex, state, mobileViewport, onSelect) => (
    <Step
      step={step}
      stepIndex={stepIndex}
      state={state}
      mobileViewport={mobileViewport}
      onSelect={onSelect}
    />
  )
);

function getStepsNum(steps) {
  // Add two steps for Intro and Outro
  return steps.length + 2;
}

function getYOffsetForState({
  steps,
  rootViewport,
  elHeights,
  activeStepIndex
}) {
  if (!isLayoutReady({ steps, rootViewport, elHeights })) {
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

function getOpacityForState({ steps, rootViewport, elHeights }) {
  return isLayoutReady({ steps, rootViewport, elHeights }) ? 1 : 0;
}

function isLayoutReady({ steps, rootViewport, elHeights }) {
  // Wait until we now the parent's width/height
  if (!rootViewport) {
    return false;
  }

  // Wait until we now the layout of all steps
  // NOTE: This means all steps are rendered from the start
  if (Object.keys(elHeights).length < getStepsNum(steps)) {
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

function isMobileViewport(viewport) {
  return viewport ? viewport.width > 552 : false;
}

const Inner = styled.View`
  position: absolute;
  top: 100%;
  width: 100%;
`;

const AnimatedInner = Animated.createAnimatedComponent(Inner);

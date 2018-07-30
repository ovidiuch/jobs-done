import React, { Component } from 'react';
import styled from 'styled-components';
import { ActiveElement } from '../ActiveElement';
import { Step } from '../Step';
import { Intro } from '../Intro';
import { Outro } from '../Outro';
import { Background } from './Background';
import { steps } from './data';

export class App extends Component {
  state = {
    activeStep: -1,
    activeElOffset: null
  };

  componentDidMount() {
    // window isn't available on the server side, but nor is componentDidMount
    // called on the server
    global.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // window isn't available on the server side, but nor is componentWillUnmount
    // called on the server
    global.removeEventListener('keydown', this.handleKeyDown);
  }

  handleActiveElRef = el => {
    this.setState({
      activeElOffset: {
        top: el.offsetTop,
        height: el.offsetHeight
      }
    });
  };

  handleSelect = stepIndex => {
    const { activeStep } = this.state;

    if (stepIndex === activeStep) {
      this.handleNext();
    } else {
      this.setState({
        activeStep: stepIndex
      });
    }
  };

  handlePrev = () => {
    const { activeStep } = this.state;

    if (activeStep > -1) {
      this.setState({
        activeStep: activeStep - 1
      });
    }
  };

  handleNext = () => {
    const { activeStep } = this.state;

    if (activeStep < steps.length) {
      this.setState({
        activeStep: activeStep + 1
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
    const { activeStep } = this.state;

    const isIntroActive = activeStep === -1;
    const isOutroActive = activeStep === steps.length;

    return (
      <Background>
        <Center>
          <Inner style={this.getInnerStyle()}>
            <ActiveElement
              key={-1}
              state={isIntroActive ? 'active' : 'past'}
              onElRef={this.handleActiveElRef}
            >
              <Intro isActive={isIntroActive} onStart={this.handleNext} />
            </ActiveElement>
            {steps.map((step, index) => {
              const isChecked = activeStep > index;
              const state =
                activeStep === index ? 'active' : isChecked ? 'past' : 'hidden';

              return (
                <ActiveElement
                  key={index}
                  state={state}
                  onElRef={this.handleActiveElRef}
                >
                  <Step
                    {...step}
                    stepIndex={index}
                    state={state}
                    isChecked={isChecked}
                    onSelect={this.handleSelect}
                  />
                </ActiveElement>
              );
            })}
            <ActiveElement
              state={isOutroActive ? 'active' : 'hidden'}
              onElRef={this.handleActiveElRef}
            >
              {onChildUpdate => <Outro onChildUpdate={onChildUpdate} />}
            </ActiveElement>
          </Inner>
        </Center>
      </Background>
    );
  }

  getInnerStyle() {
    const { activeElOffset } = this.state;

    if (!activeElOffset) {
      // Don't show inner container until app is rendered on the client. But
      // let DOM element render to properly calculate its bounds
      return { opacity: 0 };
    }

    const { top, height } = activeElOffset;

    if (isMobileDevice()) {
      return {
        opacity: 1,
        top: '100%',
        transform: `translate(0, -${top + height}px)`
      };
    }

    return {
      opacity: 1,
      top: '50%',
      transform: `translate(0, -${top + Math.round(height / 2)}px)`
    };
  }
}

function isMobileDevice() {
  return 'ontouchstart' in global;
}

const Center = styled.div`
  position: relative;
  width: 100%;
  max-width: 552px;
  height: 100%;
`;

const Inner = styled.div`
  box-sizing: border-box;
  position: absolute;
  transition: transform 1s, opacity 2s;
`;

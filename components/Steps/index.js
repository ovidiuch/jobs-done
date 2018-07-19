import React, { Component } from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';
import { ActiveElement } from '../ActiveElement';
import { Step } from '../Step';
import { Intro } from '../Intro';
import { Outro } from '../Outro';
import { steps } from './data';
import jobsDoneSound from './jobs-done.mp3';

export class Steps extends Component {
  state = {
    activeStep: -1,
    activeElOffset: null,
    selectedActivityType: null
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

  handleSelectActivityType = activityType => {
    this.setState({
      selectedActivityType: activityType
    });
  };

  render() {
    const { activeStep, selectedActivityType } = this.state;

    const isIntroActive = activeStep === -1;
    const isOutroActive = activeStep === steps.length;

    return (
      <>
        <Container>
          <Center>
            <Inner style={this.getInnerStyle()}>
              <ActiveElement
                key={-1}
                isActive={isIntroActive}
                activeElRef={this.handleActiveElRef}
              >
                <Intro isActive={isIntroActive} onStart={this.handleNext} />
              </ActiveElement>
              {steps.map((step, index) => {
                const isReached = activeStep >= index;
                const isActive = activeStep === index;

                return (
                  isReached && (
                    <ActiveElement
                      key={index}
                      isActive={isActive}
                      activeElRef={this.handleActiveElRef}
                    >
                      <Step
                        {...step}
                        isActive={isActive}
                        onDone={this.handleNext}
                      />
                    </ActiveElement>
                  )
                );
              })}
              {isOutroActive && (
                <ActiveElement
                  key={selectedActivityType}
                  isActive={isOutroActive}
                  activeElRef={this.handleActiveElRef}
                >
                  <Outro
                    selectedActivityType={selectedActivityType}
                    selectActivityType={this.handleSelectActivityType}
                  />
                </ActiveElement>
              )}
            </Inner>
          </Center>
        </Container>
        {isOutroActive && <JobsDoneSound />}
      </>
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
        transform: `translate(0, -${top + height + 16}px)`
      };
    }

    return {
      opacity: 1,
      top: '50%',
      transform: `translate(0, -${top + Math.round(height / 2) + 16}px)`
    };
  }
}

class JobsDoneSound extends Component {
  shouldComponentUpdate() {
    // Don't play song more than once
    return false;
  }

  render() {
    return <Sound url={jobsDoneSound} playStatus={Sound.status.PLAYING} />;
  }
}

function isMobileDevice() {
  return 'ontouchstart' in global;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Center = styled.div`
  position: relative;
  width: 100%;
  max-width: 512px;
  height: 100%;
`;

const Inner = styled.div`
  box-sizing: border-box;
  position: absolute;
  transition: transform 0.4s, opacity 1s;
`;

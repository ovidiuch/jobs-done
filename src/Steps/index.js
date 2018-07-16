import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { ActiveElement } from '../ActiveElement';
import { Step } from '../Step';
import { Intro } from '../Intro';
import { Outro } from '../Outro';
import { steps } from './data';

export class Steps extends Component {
  state = {
    activeStep: -1,
    topOffset: 0
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleActiveElRef = el => {
    this.setState({
      topOffset: el.offsetTop + el.offsetHeight + 16
    });
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
    }
  };

  render() {
    const { activeStep, topOffset } = this.state;
    const isIntroActive = activeStep === -1;
    const isOutroActive = activeStep === steps.length;

    return (
      <Container>
        <Center>
          <Inner style={{ transform: `translate(0, -${topOffset}px)` }}>
            <ActiveElement
              key={-1}
              isActive={isIntroActive}
              activeElRef={this.handleActiveElRef}
            >
              <Intro isActive={isIntroActive} onStart={this.handleNext} />
            </ActiveElement>
            {steps.map((step, index) => {
              const isActive = index === activeStep;

              return (
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
              );
            })}
            <ActiveElement
              key={steps.length}
              isActive={isOutroActive}
              activeElRef={this.handleActiveElRef}
            >
              <Outro isActive={isOutroActive} />
            </ActiveElement>
          </Inner>
        </Center>
      </Container>
    );
  }
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
`;

const Center = styled.div`
  position: relative;
  width: 100%;
  max-width: 512px;
  height: 100%;
  max-height: 512px;
`;

const Inner = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  transition: transform 0.4s;
`;

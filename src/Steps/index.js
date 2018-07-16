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
    activeStep: -1
  };

  handleNext = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1
    }));
  };

  render() {
    const { activeStep } = this.state;
    const isIntroActive = activeStep === -1;
    const isOutroActive = activeStep === steps.length;

    return (
      <Center>
        <Inner>
          <ActiveElement key={-1} isActive={isIntroActive}>
            <Intro isActive={isIntroActive} onStart={this.handleNext} />
          </ActiveElement>
          {steps.map((step, index) => {
            const isActive = index === activeStep;

            return (
              <ActiveElement key={index} isActive={isActive}>
                <Step {...step} isActive={isActive} onDone={this.handleNext} />
              </ActiveElement>
            );
          })}
          <ActiveElement key={steps.length} isActive={isOutroActive}>
            <Outro isActive={isOutroActive} />
          </ActiveElement>
        </Inner>
      </Center>
    );
  }
}

const Center = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 512px;
`;

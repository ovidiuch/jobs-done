import React, { Component } from 'react';
import styled from 'styled-components';
import { Step } from '../Step';
import { steps } from './data';

export class Steps extends Component {
  state = {
    activeStep: 0
  };

  handleDone = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1
    }));
  };

  render() {
    const { activeStep } = this.state;

    return (
      <Center>
        <StepsContainer>
          {steps.map((step, index) => (
            <Step
              key={index}
              {...step}
              isActive={index === activeStep}
              onDone={this.handleDone}
            />
          ))}
        </StepsContainer>
      </Center>
    );
  }
}

const StepsContainer = styled.div`
  box-sizing: border-box;
  width: 512px;
`;

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

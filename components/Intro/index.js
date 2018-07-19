import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

export class Intro extends Component {
  static propTypes = {
    isActive: bool.isRequired,
    onStart: func.isRequired
  };

  render() {
    const { isActive, onStart } = this.props;

    return (
      <Container>
        <p>
          <strong>{`Here's to another productive day!`}</strong>
        </p>
        <p>
          {`You gave it your best. Now it's time to call it a day and let that big
          brain of yours relax.`}
        </p>
        <p>
          {`Make sure everything's in check and lay down an outline for tomorrow.`}
        </p>
        {isActive && (
          <ButtonContainer>
            <Button onClick={onStart}>Start</Button>
          </ButtonContainer>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 40px 16px;
`;

const ButtonContainer = styled.div`
  float: right;
`;

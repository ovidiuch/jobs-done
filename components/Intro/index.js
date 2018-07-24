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
        <h2>Here&apos;s to another productive day!</h2>
        <p>
          You gave it your best. Now it&apos;s time to call it a day and let
          that big brain of yours relax.
        </p>
        <p>
          Make sure everything&apos;s in check and lay down an outline for
          tomorrow.
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
  padding: 0 20px 68px 20px;
`;

const ButtonContainer = styled.div`
  float: right;
`;

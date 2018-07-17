import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

export class Intro extends Component {
  render() {
    const { isActive, onStart } = this.props;

    return (
      <Container>
        <p>
          <strong>Here's to another productive day!</strong>
        </p>
        <p>
          You gave it your best. Now it's time to call it a day and let that big
          brain of yours relax.
        </p>
        <p>
          Make sure everything's in check and lay down an outline for tomorrow.
        </p>
        <div>{isActive && <Button onClick={onStart}>Start</Button>}</div>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 40px 16px;
`;

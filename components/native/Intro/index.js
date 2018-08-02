import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Header, Paragraph } from '../shared/primitives';
import { Button } from '../shared/Button';

export class Intro extends Component {
  static propTypes = {
    isActive: bool.isRequired,
    onStart: func.isRequired
  };

  render() {
    const { isActive, onStart } = this.props;

    return (
      <Container>
        <Header>Here&apos;s to another productive day!</Header>
        <Paragraph>
          You gave it your best. It&apos;s time to call it a day and let that
          big brain of yours relax.
        </Paragraph>
        <Paragraph>
          Make sure everything&apos;s in check and lay down an outline for
          tomorrow.
        </Paragraph>
        <ButtonContainer>
          <Button label="Start" disabled={!isActive} onPress={onStart} />
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = styled.View`
  padding: 0 20px 20px 20px;
`;

const ButtonContainer = styled.View`
  margin: 0 0 0 auto;
`;

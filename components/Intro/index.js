import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Header, Paragraph } from '../shared/text';
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
        <Header>Here&apos;s to a great day!</Header>
        <Paragraph>
          You gave it your best.{`\n`}Call it a day and let your big brain
          relax.
        </Paragraph>
        <Paragraph>
          Make sure everything&apos;s in check{`\n`}and plot an outline for
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
  padding: 0 20px 0 20px;
`;

const ButtonContainer = styled.View`
  margin: 0 0 0 auto;
`;

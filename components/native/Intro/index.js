import { bool, func } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components/native';
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

const Header = styled.Text`
  margin: 0 0 32px 0;
  color: rgba(234, 237, 247, 1);
  font-size: 32px;
  font-weight: 300;
  line-height: 40px;
  letter-spacing: 0.5px;
`;

const Paragraph = styled.Text`
  margin: 0 0 20px 0;
  color: rgba(217, 223, 247, 0.8);
  font-size: 18px;
  line-height: 30px;
`;

const ButtonContainer = styled.View`
  margin: 0 0 0 auto;
`;

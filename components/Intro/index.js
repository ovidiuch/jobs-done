import { bool, func } from 'prop-types';
import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Header, Paragraph } from '../shared/text';
import { Button } from '../shared/Button';

export class Intro extends PureComponent {
  static propTypes = {
    isActive: bool.isRequired,
    onSelect: func.isRequired,
    onStart: func.isRequired
  };

  render() {
    const { isActive, onSelect, onStart } = this.props;

    const content = (
      <Container>
        <Header>Here&apos;s to a great day!</Header>
        <Paragraph>You gave it your best.</Paragraph>
        <Paragraph>
          Call it a day. Make sure everything&apos;s in check and plot an
          outline for tomorrow.
        </Paragraph>
        <ButtonContainer>
          {isActive ? (
            <Button label="START" onPress={onStart} />
          ) : (
            <Button label="START" disabled />
          )}
        </ButtonContainer>
      </Container>
    );

    return isActive ? (
      content
    ) : (
      <TouchableWithoutFeedback onPress={onSelect}>
        {content}
      </TouchableWithoutFeedback>
    );
  }
}

const Container = styled.View`
  padding: 0 20px 0 20px;
`;

const ButtonContainer = styled.View`
  margin: 0 0 0 auto;
`;

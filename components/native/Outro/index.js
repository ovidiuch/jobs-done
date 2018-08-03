import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Header, Paragraph } from '../shared/text';
import { Activities } from './Activities';

export class Outro extends Component {
  render() {
    return (
      <Container>
        <Header>Shutdown complete.</Header>
        <Paragraph>
          Time to unwind. Let work sink in your subconscious until tomorrow.
        </Paragraph>
        <Paragraph>What do you feel like doing this evening?</Paragraph>
        <Activities />
      </Container>
    );
  }
}

const Container = styled.View`
  padding: 52px 20px 0 20px;
`;

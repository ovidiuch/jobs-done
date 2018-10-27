import React, { Component } from 'react';
import styled from 'styled-components/native';
import { appDataType } from '../shared/propTypes';
import { Header, Paragraph } from '../shared/text';
import { Activities } from './Activities';

export class Outro extends Component {
  static propTypes = {
    appData: appDataType.isRequired
  };

  render() {
    const {
      appData: { setPhrase, activities }
    } = this.props;

    return (
      <Container>
        <Header>{setPhrase}</Header>
        <Paragraph>
          Time to unwind.{`\n`}Let work sink in your subconscious until
          tomorrow.
        </Paragraph>
        <Paragraph>What do you feel up for this evening?</Paragraph>
        <Activities activities={activities} />
      </Container>
    );
  }
}

const Container = styled.View`
  padding: 52px 20px 0 20px;
`;

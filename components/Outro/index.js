import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { appDataType } from '../shared/propTypes';
import { Header, Paragraph } from '../shared/text';
import { Activities } from './Activities';

export class Outro extends PureComponent {
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
        <Paragraph>Let work marinate in your subconscious overnight.</Paragraph>
        <Paragraph>
          Time to unwind. What do you feel up for this evening?
        </Paragraph>
        <Activities activities={activities} />
      </Container>
    );
  }
}

const Container = styled.View`
  padding: 52px 20px 0 20px;
`;

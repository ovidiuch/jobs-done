import { string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';
import { Text } from '../../shared/text';

// TODO Fix `last` prop warning
export function ActivityOptions({ label }) {
  switch (label) {
    case 'Social':
      return (
        <List>
          <ListItem>Attend an event</ListItem>
          <ListItem>Take someone to dinner</ListItem>
          <ListItem>Hang out with a friend</ListItem>
          <ListItem last>Call someone dear</ListItem>
        </List>
      );
    case 'Physical':
      return (
        <List>
          <ListItem>Go for a run</ListItem>
          <ListItem>Go for a swim</ListItem>
          <ListItem>Take a long walk</ListItem>
          <ListItem last>Work out</ListItem>
        </List>
      );
    case 'Leisure':
      return (
        <List>
          <ListItem>Read a book</ListItem>
          <ListItem>Play a game</ListItem>
          <ListItem>Go see a play</ListItem>
          <ListItem last>Watch a movie</ListItem>
        </List>
      );
    default:
      return null;
  }
}

ActivityOptions.propTypes = {
  label: string
};

const List = styled.View`
  width: 100%;
`;

const ListItem = Text.extend`
  line-height: 24px;
  margin: 0 0 ${props => (props.last ? 0 : 4)}px 0;
  padding: 0 0 0 40px;
`;

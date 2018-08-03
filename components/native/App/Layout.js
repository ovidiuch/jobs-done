import { node, func } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Background } from './Background';

export class Layout extends Component {
  static propTypes = {
    children: node,
    onLayout: func
  };

  render() {
    const { children, onLayout } = this.props;

    return (
      <Container onLayout={onLayout}>
        <Background />
        <Content>{children}</Content>
      </Container>
    );
  }
}

const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 9, 21, 1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

const Content = styled.View`
  position: absolute;
  width: 100%;
  max-width: 552px;
  height: 100%;
  display: flex;
`;

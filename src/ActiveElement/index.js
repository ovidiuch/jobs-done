import React, { Component } from 'react';
import styled from 'styled-components';

export class ActiveElement extends Component {
  render() {
    const { isActive, children } = this.props;

    return <Container isActive={isActive}>{children}</Container>;
  }
}

const Container = styled.div`
  opacity: ${props => (props.isActive ? 1 : 0.6)};
  transition: opacity 0.4s;
`;

import React, { Component } from 'react';
import styled from 'styled-components';

export class ActiveElement extends Component {
  handleRef = el => {
    const { isActive, activeElRef } = this.props;

    if (el) {
      activeElRef(el);
    }
  };

  render() {
    const { isActive, children } = this.props;

    return (
      <Container isActive={isActive} innerRef={isActive && this.handleRef}>
        {children}
      </Container>
    );
  }
}

const Container = styled.div`
  opacity: ${props => (props.isActive ? 1 : 0.5)};
  transition: opacity 0.4s;
`;

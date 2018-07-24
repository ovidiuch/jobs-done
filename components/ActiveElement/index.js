import { bool, func, node } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

export class ActiveElement extends Component {
  static propTypes = {
    children: node.isRequired,
    isActive: bool.isRequired,
    activeElRef: func.isRequired
  };

  handleRef = el => {
    const { activeElRef } = this.props;

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
  transition: opacity 1s;
`;

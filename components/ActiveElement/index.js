import { func, node, oneOf } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

export class ActiveElement extends Component {
  static propTypes = {
    children: node.isRequired,
    state: oneOf(['hidden', 'active', 'past']).isRequired,
    activeElRef: func.isRequired
  };

  handleRef = el => {
    const { activeElRef } = this.props;

    if (el) {
      activeElRef(el);
    }
  };

  render() {
    const { state, children } = this.props;

    return (
      <Container state={state} innerRef={state === 'active' && this.handleRef}>
        {children}
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 0 0 20px 0;
  opacity: ${props =>
    props.state === 'active' ? 1 : props.state === 'past' ? 0.5 : 0};
  transition: opacity 1s;
`;

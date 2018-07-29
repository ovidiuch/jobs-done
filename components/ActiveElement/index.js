import { func, node, oneOf, oneOfType } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

export class ActiveElement extends Component {
  static propTypes = {
    children: oneOfType([node, func]).isRequired,
    state: oneOf(['hidden', 'active', 'past']).isRequired,
    onElRef: func.isRequired
  };

  rootEl;

  handleRef = el => {
    this.rootEl = el;

    if (el) {
      this.props.onElRef(el);
    }
  };

  handleChildUpdate = () => {
    if (this.rootEl) {
      this.props.onElRef(this.rootEl);
    }
  };

  render() {
    const { state, children } = this.props;

    return (
      <Container state={state} innerRef={state === 'active' && this.handleRef}>
        {typeof children === 'function'
          ? children(this.handleChildUpdate)
          : children}
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

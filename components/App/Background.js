import { node } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

export class Background extends Component {
  static propTypes = {
    children: node
  };

  render() {
    const { children } = this.props;

    return (
      <>
        <Container>
          <Sunset />
          {children}
        </Container>
      </>
    );
  }
}

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 9, 21, 1),
    rgba(22, 35, 95, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Sunset = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  transform: translate(-25%, 5%);
  background: radial-gradient(
    ellipse closest-side,
    rgba(107, 76, 122, 0.5),
    rgba(107, 76, 122, 0) 100%
  );
`;

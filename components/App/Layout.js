import { node } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components/native';

// TODO: Add linear gradient to bg
// import LinearGradient from 'react-native-linear-gradient';
// <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>

export class Layout extends Component {
  static propTypes = {
    children: node
  };

  render() {
    const { children } = this.props;

    return (
      <Container>
        <Sunset />
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
// background: linear-gradient(
//   to bottom,
//   rgba(0, 9, 21, 1),
//   rgba(22, 35, 95, 1) 100%
// );

const Sunset = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: rgba(107, 76, 122, 0.5);
`;
// transform: translate(-25%, 5%);
// background: radial-gradient(
//   ellipse closest-side,
//   rgba(107, 76, 122, 0.5),
//   rgba(107, 76, 122, 0) 100%
// );

const Content = styled.View`
  position: absolute;
  width: 100%;
  max-width: 552px;
  height: 100%;
  display: flex;
`;

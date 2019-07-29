import React from 'react';
import { node } from 'prop-types';
import styled from 'styled-components/native';
import { Layout } from '../../../components/App/Layout';

export function LayoutDecorator({ children }) {
  return (
    <Layout>
      <Center>{children}</Center>
    </Layout>
  );
}

LayoutDecorator.propTypes = {
  children: node.isRequired
};

const Center = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

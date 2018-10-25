import React from 'react';
import styled from 'styled-components/native';
import { proxyPropTypes } from 'react-cosmos-shared/react';
import { Layout } from '../../../components/App/Layout';

export function BgProxy(props) {
  const { nextProxy, fixture } = props;

  if (!fixture.bg) {
    return <nextProxy.value {...props} nextProxy={nextProxy.next()} />;
  }

  return (
    <Layout>
      <Center>
        <nextProxy.value {...props} nextProxy={nextProxy.next()} />
      </Center>
    </Layout>
  );
}

BgProxy.propTypes = proxyPropTypes;

const Center = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

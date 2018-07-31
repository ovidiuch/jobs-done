import React from 'react';
import { proxyPropTypes } from 'react-cosmos-shared/react';
import { Background } from './components/App/Background';

function BgProxy(props) {
  const { nextProxy } = props;

  return (
    <Background>
      <nextProxy.value {...props} nextProxy={nextProxy.next()} />
    </Background>
  );
}

BgProxy.propTypes = proxyPropTypes;

export default [BgProxy];

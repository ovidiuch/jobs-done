import React from 'react';
import { proxyPropTypes } from 'react-cosmos-shared/react';
import { Background } from './components/App/Background';

function BgProxy(props) {
  const { children, nextProxy } = props;

  return (
    <Background>
      <nextProxy.value {...props} nextProxy={nextProxy.next()}>
        {children}yo
      </nextProxy.value>
    </Background>
  );
}

BgProxy.propTypes = proxyPropTypes;

export default [BgProxy];

import React from 'react';
import { proxyPropTypes } from 'react-cosmos-shared/react';

export function DecoratorProxy(props) {
  const { nextProxy, fixture } = props;

  if (!fixture.decorator) {
    return <nextProxy.value {...props} nextProxy={nextProxy.next()} />;
  }

  return <fixture.decorator ref={props.onComponentRef} />;
}

DecoratorProxy.propTypes = proxyPropTypes;

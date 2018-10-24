import { Component } from 'react';

export class UnmountAwareComponent extends Component {
  unmounted = false;

  componentWillUnmount() {
    // NOTE: Remember to call super.componentWillUnmount is subclasses #OOPftw
    this.unmounted = true;
  }
}

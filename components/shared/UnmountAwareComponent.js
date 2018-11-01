import { PureComponent } from 'react';

export class UnmountAwareComponent extends PureComponent {
  unmounted = false;

  componentWillUnmount() {
    // NOTE: Remember to call super.componentWillUnmount is subclasses #OOPftw
    this.unmounted = true;
  }
}

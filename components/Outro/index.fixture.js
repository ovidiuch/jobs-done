import { Outro } from '.';

export default {
  component: Outro,
  props: {
    onChildUpdate: () => console.log(`On child update`)
  }
};

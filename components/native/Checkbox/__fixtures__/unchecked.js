import { Checkbox } from '..';

export default {
  component: Checkbox,
  props: {
    checked: false,
    onSelect: () => console.log('Select checkbox')
  },
  viewport: {
    width: 320,
    height: 568
  }
};

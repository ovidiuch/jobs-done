import { Checkbox } from '..';

export default {
  component: Checkbox,
  props: {
    checked: true,
    onSelect: () => console.log('Select checkbox')
  },
  bg: true,
  viewport: {
    width: 320,
    height: 568
  }
};

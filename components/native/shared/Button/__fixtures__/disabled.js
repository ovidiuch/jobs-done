import { Button } from '..';

export default {
  component: Button,
  props: {
    label: 'Start',
    disabled: true,
    onPress: () => console.log('Button press')
  },
  bg: true
};

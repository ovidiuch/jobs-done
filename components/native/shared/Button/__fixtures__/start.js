import { Button } from '..';

export default {
  component: Button,
  props: {
    label: 'Start',
    onPress: () => console.log('Button press')
  },
  bg: true
};

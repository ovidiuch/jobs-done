import { Intro } from '..';

export default {
  component: Intro,
  props: {
    isActive: true,
    onStart: () => console.log('Intro start'),
    onSelect: () => console.log('Intro select')
  },
  bg: true
};

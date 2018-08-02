import { Intro } from '..';

export default {
  component: Intro,
  props: {
    isActive: false,
    onStart: () => console.log('Intro start')
  },
  bg: true
};

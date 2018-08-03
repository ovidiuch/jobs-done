import { Intro } from '..';

export default {
  component: Intro,
  props: {
    isActive: true,
    onStart: () => console.log('Intro start')
  },
  bg: true
};

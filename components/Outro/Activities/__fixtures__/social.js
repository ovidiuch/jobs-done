import { appData } from '../../../../data';
import { Activities } from '..';

export default {
  component: Activities,
  props: {
    activities: appData.activities
  },
  state: {
    selectedActivityType: 'Social'
  },
  bg: true
};

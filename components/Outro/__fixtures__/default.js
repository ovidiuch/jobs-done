import { appData } from '../../../data';
import { Outro } from '..';

export default {
  component: Outro,
  props: {
    activities: appData.activities
  },
  bg: true
};

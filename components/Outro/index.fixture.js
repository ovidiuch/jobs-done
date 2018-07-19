import { Outro } from '.';

export default {
  component: Outro,
  props: {
    selectActivityType: activityType => console.log(`Select ${activityType}`)
  }
};

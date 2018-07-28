import { Step } from '..';

export default {
  component: Step,
  props: {
    stepIndex: 0,
    name: 'Reply to (or schedule) anything urgent',
    urls: [
      'https://mail.google.com/mail/',
      'https://react-cosmos.slack.com/messages/C4E8D7K6J/'
    ],
    state: 'active',
    isChecked: false,
    onSelect: () => console.log('Select')
  },
  viewport: {
    width: 411,
    height: 731
  }
};

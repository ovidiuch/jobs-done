import { Step } from '..';

export default {
  component: Step,
  props: {
    stepIndex: 0,
    name: 'Reply to (or schedule) anything urgent',
    urls: [
      'https://mail.google.com/mail/',
      'slack://react-cosmos.slack.com/messages/general/'
    ],
    state: 'disabled',
    onSelect: () => console.log('Select')
  },
  bg: true,
  viewport: {
    width: 411,
    height: 731
  }
};

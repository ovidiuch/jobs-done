import { Step } from '..';

export default {
  component: Step,
  props: {
    stepIndex: 0,
    step: {
      name: 'Reply to (or schedule) anything urgent',
      urls: [
        'https://mail.google.com/mail/',
        'slack://react-cosmos.slack.com/messages/general/'
      ]
    },
    state: 'active',
    onSelect: () => console.log('Select'),
    mobileViewport: true
  },
  bg: true,
  viewport: {
    width: 411,
    height: 731
  }
};

import { string, shape, oneOf, arrayOf, objectOf } from 'prop-types';

export const stepStateType = oneOf(['disabled', 'active', 'checked']);

export const stepType = shape({
  name: string.isRequired,
  urls: arrayOf(string).isRequired
});

export const activitiesType = objectOf(arrayOf(string));

export const appDataType = shape({
  steps: arrayOf(stepType).isRequired,
  setPhrase: string.isRequired,
  activities: activitiesType.isRequired
});

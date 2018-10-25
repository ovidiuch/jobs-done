import { shuffle } from 'lodash';

const CHEERS = [
  'Do it!',
  'Nice!',
  'Great!',
  'Good idea!',
  'Right on!',
  'Enjoy!',
  'Sweet!',
  'Exciting!',
  'Excellent!',
  'Boom!'
];

let nextCheers = [];

export function getRandomCheerLabel() {
  if (nextCheers.length === 0) {
    genNextCheers();
  }

  return nextCheers.pop();
}

function genNextCheers() {
  nextCheers = shuffle(CHEERS);
}

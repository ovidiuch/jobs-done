const CHEERS = [
  'Nice one!',
  'Go at it!',
  'Do it!',
  'Nice!',
  'Sounds great!',
  'Good idea!',
  'Right on!',
  'Enjoy!',
  'Sweet!',
  'Exciting!'
];

// TODO: Shuffle to get even distribution
export function getRandomCheerLabel() {
  return CHEERS[Math.round(Math.random() * (CHEERS.length - 1))];
}

export {}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = <T> (array: Array<T>) => {
  return array.sort(() => Math.random() - 0.5);
}
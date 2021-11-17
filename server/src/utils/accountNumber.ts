export const generateRandomAccountNumber = (): number => {
  return Math.floor(Math.random() * 99999999999); // easiest way to generate a random number, you could also you time-stamp
};

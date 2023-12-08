export const LeastCommonMultiple = (...arr: number[]) => {
  return [...arr].reduce((a, b) => (a * b) / GreatestCommonDivisor(a, b));
};

export const GreatestCommonDivisor = (x: number, y: number): number => {
  return !y ? x : GreatestCommonDivisor(y, x % y);
};

export const Transpose = (arr: unknown[][]) => {
  return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
};

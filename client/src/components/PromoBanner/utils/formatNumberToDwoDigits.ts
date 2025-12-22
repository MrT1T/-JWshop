export const formatNumberToDwoDigits = (num: number) => {
  if (num < 10 && num >= 0) {
    return `0${num}`;
  }

  return String(num);
};

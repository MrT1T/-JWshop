export const calculateDurationTimeUnits = (duration: number) => {
  const days = Math.floor(duration / calculateTimeUnitsToMs('days'));
  const hours = Math.floor(
    (duration % calculateTimeUnitsToMs('days')) /
      calculateTimeUnitsToMs('hours'),
  );
  const minutes = Math.floor(
    (duration % calculateTimeUnitsToMs('hours')) /
      calculateTimeUnitsToMs('minutes'),
  );
  const seconds = Math.floor(
    (duration % calculateTimeUnitsToMs('minutes')) /
      calculateTimeUnitsToMs('seconds'),
  );

  return { days, hours, minutes, seconds };
};

export const calculateTimeUnitsToMs = (
  units: 'days' | 'hours' | 'minutes' | 'seconds',
  value = 1,
) => {
  switch (units) {
    case 'days':
      return value * 1000 * 60 * 60 * 24;
    case 'hours':
      return value * 1000 * 60 * 60;
    case 'minutes':
      return value * 1000 * 60;
    default:
      return value * 1000;
  }
};

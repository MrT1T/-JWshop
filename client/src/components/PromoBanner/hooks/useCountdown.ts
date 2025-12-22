import { useEffect, useMemo, useState } from 'react';

import { calculateDurationTimeUnits } from '../utils';

export const useCountdown = (targetDate: Date) => {
  const initialValue = useMemo(
    () => targetDate.getTime() - new Date().getTime(),
    [targetDate],
  );
  const [countDown, setCountDown] = useState(initialValue);

  useEffect(() => {
    setCountDown(initialValue);
    const interval = setInterval(() => {
      setCountDown(prevState => {
        if (prevState > 0) {
          const value = targetDate.getTime() - new Date().getTime();

          return value > 0 ? value : 0;
        }

        clearInterval(interval);

        return prevState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialValue, targetDate]);

  return useMemo(() => calculateDurationTimeUnits(countDown), [countDown]);
};

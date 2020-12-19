import { useEffect, useState } from 'react';

interface ITime {
  hours: string;
  minutes: string;
  seconds: string;
  isOdd: boolean;
}

const formatNumber = (number: number) => {
  if (number >= 0 && number <= 9) {
    return `0${number}`;
  }
  return number.toString();
};

export const useDiffTime = (start: Date = new Date()) => {
  const [time, setTime] = useState<ITime>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    isOdd: true,
  });

  const calculate = (s: Date, end: Date) => {
    const now = end.getTime();
    const diff = new Date(now - s.getTime());
    setTime((prev) => ({
      hours: formatNumber(diff.getUTCHours()),
      minutes: formatNumber(diff.getUTCMinutes()),
      seconds: formatNumber(diff.getUTCSeconds()),
      isOdd: !prev.isOdd,
    }));
  };

  useEffect(() => {
    calculate(start, new Date());
  }, []);

  return {
    time,
    calculate,
  };
};

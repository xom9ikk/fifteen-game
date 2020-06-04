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
  const offset = new Date().getTimezoneOffset() * 60 * 1000;

  const calculate = (s: Date, end: Date) => {
    const now = end.getTime() + offset;
    const diff = new Date(now - s.getTime());
    setTime((prev) => ({
      hours: formatNumber(diff.getHours()),
      minutes: formatNumber(diff.getMinutes()),
      seconds: formatNumber(diff.getSeconds()),
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

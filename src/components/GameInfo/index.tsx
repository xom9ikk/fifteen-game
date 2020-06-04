import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/reducers/state';
import { useDiffTime } from '../../use/formattedTime';

export const GameInfo: FC = () => {
  const { start, movements } = useSelector((state: IRootState) => state.session);
  const { time, calculate } = useDiffTime(start);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        calculate(start, new Date());
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
    calculate(new Date(), new Date());
  }, [start]);

  const drawDivider = () => (
    <span className={`info__time-divider ${time?.isOdd ? '' : 'info__time-divider--invisible'}`}>:</span>
  );

  return (
    <div className="info">
      <div className="info__wrapper">
        <div className="info__time">
          <span>{time?.hours}</span>
          {drawDivider()}
          <span>{time?.minutes}</span>
          {drawDivider()}
          <span>{time?.seconds}</span>
        </div>
        <div className="info__steps">
          Movements:
          {' '}
          {movements}
        </div>
      </div>
    </div>
  );
};

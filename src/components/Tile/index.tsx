import React, { FC } from 'react';

export interface ITile {
  value: number;
  left: number;
  top: number;
  position: number;
}

export const Tile: FC<ITile> = ({ value, left, top }) => (
  <div className={`tile ${value === 0 ? 'tile--hide' : ''}`} style={{ left, top }}>
    <span className="tile__text">
      {value}
    </span>
  </div>
);

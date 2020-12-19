import React, { FC } from 'react';

interface ILogo {
  isMenuOpened: boolean;
}

export const Logo: FC<ILogo> = ({ isMenuOpened }) => (
  <div className={`logo ${isMenuOpened ? 'logo--menu-open' : ''}`}>
    <div className="logo__square" />
    <span className="logo__text">
      Amaze Fifteen
    </span>
  </div>
);

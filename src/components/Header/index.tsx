import React, { FC } from 'react';

interface IHeader {
  title: string;
  subtitle: string;
}

export const Header: FC<IHeader> = ({ title, subtitle }) => (
  <div className="header">
    <h3>
      {title}
    </h3>
    <h6>
      {subtitle}
    </h6>
  </div>
);

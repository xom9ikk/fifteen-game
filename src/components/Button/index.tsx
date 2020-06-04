import React, { FC } from 'react';

interface IButton {
  type: 'button' | 'submit' | 'reset',
  modificator?: 'transparent' | 'danger',
  text: string,
  onClick?: (event: React.SyntheticEvent) => void,
  size?: 'small' | 'medium',
  style?: Object,
}

export const Button: FC<IButton> = ({
  type, modificator, text,
  onClick, size, style, ...attrs
}) => {
  const classes = ['button'];

  if (modificator) {
    classes.push(`button--${modificator}`);
  }
  if (size) {
    classes.push(`button--${size}`);
  }

  return (
    <button
      {...attrs}
      className={classes.join(' ')}
      type={type}
      onClick={onClick}
      style={style}
    >
      <div
        className="button__content"
      >
        {text}
      </div>
    </button>
  );
};

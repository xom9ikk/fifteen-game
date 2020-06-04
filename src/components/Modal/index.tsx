/* eslint-disable no-undef */
import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePortal } from '../../use/portal';
import { Button } from '../Button';

interface IModal {
  isOpen: boolean,
  isSoftExit?: boolean,
  negative?: string,
  positive: string,
  onPositive: Function,
  onNegative?: Function,
  onClose: Function,
  size?: string,
  isDark?: boolean,
}

export const Modal: FC<IModal> = ({
  isOpen, isSoftExit = true, negative, positive,
  onPositive, onNegative, onClose, size = 'small', isDark = false, children,
}) => {
  const root = document.getElementById('root');

  const handlePositive = () => {
    onPositive();
  };
  const handleNegative = () => {
    if (onNegative) {
      onNegative();
    }
  };
  const handleClose = () => {
    onClose();
  };
  const setBlur = (value: number) => {
    // @ts-ignore
    root.style.filter = `blur(${value}px)`;
  };

  const classes = ['dialog'];

  const keydownHandler = (event: any) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  if (isOpen) {
    setBlur(5);
    classes.push('dialog--is-open');
    if (isSoftExit) {
      document.addEventListener('keydown', keydownHandler);
    } else {
      setBlur(0);
    }
  } else {
    setBlur(0);
  }

  useEffect(() => () => {
    document.removeEventListener('keydown', keydownHandler);
  }, []);

  const modal = (
    <>
      <div className={classes.join(' ')}>
        <span
          role="button"
          tabIndex={0}
          className="dialog__back"
          onClick={isSoftExit ? handleClose : () => {}}
        />
        <div className={`dialog__wrap dialog__wrap--${size} ${isDark ? 'dialog__wrap--dark' : ''}`}>
          <span
            role="button"
            tabIndex={0}
            className="dialog__close"
            onClick={handleClose}
          >
            <img src="/svg/close.svg" alt="close" />
          </span>
          {children}
          <div className="dialog__prompt">
            {
                negative && (
                <Button
                  type="button"
                  modificator="transparent"
                  onClick={handleNegative}
                  text={negative}
                  size="small"
                />
                )
              }
            <Button
              type="button"
              modificator="danger"
              onClick={handlePositive}
              text={positive}
              size="small"
            />
          </div>
        </div>
      </div>
    </>
  );
  const target = usePortal('modal-root');
  return ReactDOM.createPortal(modal, target);
};

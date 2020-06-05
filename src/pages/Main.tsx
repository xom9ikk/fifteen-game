import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { Container } from '../components/Container';
import { GameInfo } from '../components/GameInfo';
import { Modal } from '../components/Modal';
import { useTiles } from '../use/tiles';
import { EnumKeyCodes } from '../types/keycodes';
import { SessionActions } from '../store/actions';
import { IRootState } from '../store/reducers/state';
import { useDiffTime } from '../use/formattedTime';

export const Main: FC = () => {
  const rows = 4;
  const columns = 4;
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState<boolean>(false);
  const { start, movements } = useSelector((state: IRootState) => state.session);
  const { time, calculate } = useDiffTime(start);
  const startRef = useRef(start);
  const movementsRef = useRef(movements);

  const doneHandler = () => {
    calculate(startRef.current!, new Date());
    setIsDone(true);
    dispatch(SessionActions.end());
  };

  useEffect(() => {
    startRef.current = start;
  }, [start]);

  useEffect(() => {
    movementsRef.current = movements;
  }, [movements]);

  const {
    generateTiles, calculatePositions, tiles,
  } = useTiles(rows, columns, doneHandler);

  const keydownHandler = (event: any) => {
    switch (event.key) {
      case EnumKeyCodes.ArrowUp: { calculatePositions(EnumKeyCodes.ArrowUp); break; }
      case EnumKeyCodes.ArrowDown: { calculatePositions(EnumKeyCodes.ArrowDown); break; }
      case EnumKeyCodes.ArrowLeft: { calculatePositions(EnumKeyCodes.ArrowLeft); break; }
      case EnumKeyCodes.ArrowRight: { calculatePositions(EnumKeyCodes.ArrowRight); break; }
      default: break;
    }
  };

  useEffect(() => {
    generateTiles();
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  const restartHandler = () => {
    setIsDone(false);
    generateTiles();
    dispatch(SessionActions.reset());
  };

  const gestureHandlers = useSwipeable({
    onSwipedLeft: () => {
      calculatePositions(EnumKeyCodes.ArrowLeft);
    },
    onSwipedRight: () => {
      calculatePositions(EnumKeyCodes.ArrowRight);
    },
    onSwipedUp: () => {
      calculatePositions(EnumKeyCodes.ArrowUp);
    },
    onSwipedDown: () => {
      calculatePositions(EnumKeyCodes.ArrowDown);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <>
      <Container>
        <Header
          title="The fifteen game"
          subtitle="Slide tiles to put them in order"
        />
        <GameInfo />
        <Table
          rows={rows}
          columns={columns}
          tiles={tiles}
          gestureHandlers={gestureHandlers}
        />
      </Container>
      <Modal
        isOpen={isDone}
        positive="New game"
        onPositive={restartHandler}
        onClose={restartHandler}
      >
        <h2 className="dialog__title">You Win</h2>
        <div className="dialog__subtitle">
          <span>
            Total time:
            {time.hours}
            :
            {time.minutes}
            :
            {time.seconds}
          </span>
          <span>
            Movements:
            {movements}
          </span>
        </div>
      </Modal>
    </>
  );
};

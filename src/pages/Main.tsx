import React, {
  FC, useEffect, useState,
} from 'react';
import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { Container } from '../components/Container';
import { ITile } from '../components/Tile';

enum enumKeyCodes {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
}

export const Main: FC = () => {
  const rows = 2;
  const columns = 4;
  const [tiles, _setTiles] = useState<Array<ITile>>([]);
  const [zeroPosition, _setZeroPosition] = useState<number>(3);

  const zeroPositionRef = React.useRef(zeroPosition);
  const tilesRef = React.useRef(tiles);

  const setZeroPosition = (value: number) => {
    zeroPositionRef.current = value;
    _setZeroPosition(value);
  };

  const setTiles = (data: Array<ITile>) => {
    tilesRef.current = data;
    _setTiles(data);
  };

  const calculatePosition = (index: number) => {
    const tmpArray = [];
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        tmpArray.push({
          top: i * 100,
          left: j * 100,
        });
      }
    }
    return tmpArray[index];
  };

  const generateShuffleArray = (size: number) => {
    const numbers: Array<number> = [];
    for (let i = 0; i < size; i += 1) {
      numbers.push(i);
    }
    return numbers.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  useEffect(() => {
    const shuffledNumbers = generateShuffleArray(rows * columns);
    const initialTiles: Array<ITile> = [];
    let counter = 0;
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        initialTiles.push({
          value: shuffledNumbers[counter],
          ...calculatePosition(counter),
          position: (i * columns) + (j),
        });
        counter += 1;
      }
    }
    const index = initialTiles.findIndex((tile) => tile.value === 0);
    setZeroPosition(initialTiles[index].position);
    setTiles(initialTiles);
  }, []);

  const isLimited = (targetPosition: number) => {
    if (targetPosition < 0) {
      return true;
    }
    if (targetPosition > rows * columns - 1) {
      return true;
    }
    if (!((zeroPositionRef.current + 1) % columns)
        && targetPosition === zeroPositionRef.current + 1) {
      return true;
    }
    if (!((zeroPositionRef.current) % columns)
        && targetPosition === zeroPositionRef.current - 1) {
      return true;
    }
    return false;
  };

  const calculateTargetPosition = (keyCode: enumKeyCodes) => {
    switch (keyCode) {
      case enumKeyCodes.ArrowUp: {
        return zeroPositionRef.current + columns;
      }
      case enumKeyCodes.ArrowDown: {
        return zeroPositionRef.current - columns;
      }
      case enumKeyCodes.ArrowLeft: {
        return zeroPositionRef.current + 1;
      }
      case enumKeyCodes.ArrowRight: {
        return zeroPositionRef.current - 1;
      }
      default: return zeroPositionRef.current;
    }
  };

  const calculatePositions = (keyCode: enumKeyCodes) => {
    const targetPosition = calculateTargetPosition(keyCode);
    if (isLimited(targetPosition)) {
      return;
    }
    const zeroTilePosition = zeroPositionRef.current;
    const newTiles = tilesRef.current.map((el) => {
      if (el.position === zeroTilePosition) {
        setZeroPosition(targetPosition);
        return {
          value: el.value,
          position: targetPosition,
          ...calculatePosition(targetPosition),
        };
      }
      if (el.position === targetPosition) {
        return {
          value: el.value,
          position: zeroTilePosition,
          ...calculatePosition(zeroTilePosition),
        };
      }
      return el;
    });
    setTiles(newTiles);
  };

  const keydownHandler = (event: any) => {
    switch (event.key) {
      case enumKeyCodes.ArrowUp: { calculatePositions(enumKeyCodes.ArrowUp); break; }
      case enumKeyCodes.ArrowDown: { calculatePositions(enumKeyCodes.ArrowDown); break; }
      case enumKeyCodes.ArrowLeft: { calculatePositions(enumKeyCodes.ArrowLeft); break; }
      case enumKeyCodes.ArrowRight: { calculatePositions(enumKeyCodes.ArrowRight); break; }
      default: break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);


  return (
    <Container>
      <Header
        title="The fifteen game"
        subtitle="Slide tiles to put them in order"
      />
      <Table
        rows={rows}
        columns={columns}
        tiles={tiles}
      />
    </Container>
  );
};

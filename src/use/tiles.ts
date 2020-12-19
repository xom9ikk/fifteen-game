import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ITile } from '../components/Tile';
import { EnumKeyCodes } from '../types';
import { SessionActions } from '../store/actions';
import { useTileSize } from './tileSize';

const isLimited = (rows: number, columns: number, zeroPosition: number, targetPosition: number) => {
  if (targetPosition < 0) {
    return true;
  }
  if (targetPosition > rows * columns - 1) {
    return true;
  }
  if (!((zeroPosition + 1) % columns)
      && targetPosition === zeroPosition + 1) {
    return true;
  }
  if (!(zeroPosition % columns)
      && targetPosition === zeroPosition - 1) {
    return true;
  }
  return false;
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

const calculatePosition = (rows: number, columns: number, index: number, tileSize: number) => {
  const arr = [];
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < columns; j += 1) {
      arr.push({
        top: i * tileSize,
        left: j * tileSize,
      });
    }
  }
  return arr[index];
};

const calculateTargetPosition = (keyCode: EnumKeyCodes, zeroPosition: number, columns: number) => {
  switch (keyCode) {
    case EnumKeyCodes.ArrowUp: {
      return zeroPosition + columns;
    }
    case EnumKeyCodes.ArrowDown: {
      return zeroPosition - columns;
    }
    case EnumKeyCodes.ArrowLeft: {
      return zeroPosition + 1;
    }
    case EnumKeyCodes.ArrowRight: {
      return zeroPosition - 1;
    }
    default: return zeroPosition;
  }
};

export const useTiles = (rows: number, columns: number, onDone: Function) => {
  const dispatch = useDispatch();

  const [tiles, _setTiles] = useState<Array<ITile>>([]);
  const [zeroPosition, _setZeroPosition] = useState<number>(3);

  const { tileSize } = useTileSize();
  const tileSizeRef = useRef<number>(tileSize);

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

  const calculatePositions = (keyCode: EnumKeyCodes) => {
    const targetPosition = calculateTargetPosition(keyCode, zeroPositionRef.current, columns);
    if (isLimited(rows, columns, zeroPositionRef.current, targetPosition)) {
      return;
    }
    dispatch(SessionActions.increaseMovements());
    const zeroTilePosition = zeroPositionRef.current;
    const newTiles = tilesRef.current.map((el) => {
      if (el.position === zeroTilePosition) {
        setZeroPosition(targetPosition);
        return {
          value: el.value,
          position: targetPosition,
          ...calculatePosition(rows, columns, targetPosition, tileSizeRef.current),
        };
      }
      if (el.position === targetPosition) {
        return {
          value: el.value,
          position: zeroTilePosition,
          ...calculatePosition(rows, columns, zeroTilePosition, tileSizeRef.current),
        };
      }
      return el;
    });
    setTiles(newTiles);
  };

  const generateTiles = () => {
    const shuffledNumbers = generateShuffleArray(rows * columns);
    const initialTiles: Array<ITile> = [];
    let counter = 0;
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        initialTiles.push({
          value: shuffledNumbers[counter],
          ...calculatePosition(rows, columns, counter, tileSizeRef.current),
          position: (i * columns) + (j),
        });
        counter += 1;
      }
    }
    const index = initialTiles.findIndex((tile) => tile.value === 0);
    setZeroPosition(initialTiles[index].position);
    setTiles(initialTiles);
  };

  useEffect(() => {
    const isDone = tiles.length
        && tiles.every((tile) => tile.value === tile.position + 1 || tile.value === 0);
    if (isDone) {
      onDone();
    }
  }, [tiles]);

  useEffect(() => {
    tileSizeRef.current = tileSize;
    generateTiles();
  }, [tileSize]);

  return {
    calculatePositions,
    generateTiles,
    tiles,
  };
};

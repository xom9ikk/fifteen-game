import React, {
  FC, useEffect,
} from 'react';
import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { Container } from '../components/Container';
import { useTiles } from '../use/tiles';
import { EnumKeyCodes } from '../types/keycodes';

export const Main: FC = () => {
  const rows = 2;
  const columns = 2;

  const doneHandler = () => {
    console.log('win');
  };

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

import React, { FC } from 'react';
import { ITile, Tile } from '../Tile';
import { useTileSize } from '../../use/tileSize';

interface ITable {
  rows: number;
  columns: number;
  tiles: Array<ITile>
  gestureHandlers: Object
}


export const Table: FC<ITable> = ({
  rows, columns, tiles, gestureHandlers,
}) => {
  const { tileSize } = useTileSize();

  const getTileData = (rowIndex: number, columnIndex: number) => {
    const position = (rowIndex * columns) + (columnIndex);
    return tiles[position];
  };

  return (
    <div {...gestureHandlers} style={{ position: 'relative', left: -(columns * (tileSize / 2)) }}>
      <div className="table" style={{ width: columns * tileSize + 5, height: rows * tileSize + 5 }}>
        <table>
          <tbody>
            {
                [...new Array(rows)].map((r, rowIndex) => (
                  <tr key={rowIndex}>
                    {
                        [...new Array(columns)].map((c, columnIndex) => (
                          <td key={columnIndex} />
                        ))
                    }
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      <div className="field">
        {
          [...new Array(rows)].map((r, rowIndex) => (
            [...new Array(columns)].map((c, columnIndex) => (
              <Tile
                key={columnIndex + rowIndex}
                {...getTileData(rowIndex, columnIndex)}
              />
            ))
          ))
          }
      </div>
    </div>
  );
};

import React, { FC } from 'react';
import { ITile, Tile } from '../Tile';

interface ITable {
  rows: number;
  columns: number;
  tiles: Array<ITile>
  gestureHandlers: Object
}

export const Table: FC<ITable> = ({
  rows, columns, tiles, gestureHandlers,
}) => {
  const getTileData = (rowIndex: number, columnIndex: number) => {
    const position = (rowIndex * columns) + (columnIndex);
    return tiles[position];
  };

  return (
    <div {...gestureHandlers}>
      <div className="table" style={{ width: columns * 100 + 5, height: rows * 100 + 5 }}>
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
      <div className="field" style={{ left: -(columns * 50) }}>
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

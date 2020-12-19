import { useEffect, useState } from 'react';

const TILE_NORMAL = 100;
const TILE_SMALL = 70;

const breakPoint = 480;

export const useTileSize = () => {
  const [tileSize, setTileSize] = useState(TILE_NORMAL);


  function getTileSizeForWidth(width: number) {
    return width <= breakPoint ? TILE_SMALL : TILE_NORMAL;
  }

  useEffect(() => {
    setTileSize(getTileSizeForWidth(window.innerWidth));

    const handleResize = () => {
      setTileSize(getTileSizeForWidth(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    tileSize,
  };
};

import { createAction } from 'redux-actions';

enum Type {
  END = 'SESSION/END',
  INCREASE_MOVEMENTS = 'SESSION/INCREASE_MOVEMENTS',
  RESET = 'SESSION/RESET',
}

const end = createAction(
  Type.END,
  () => ({ }),
);

const increaseMovements = createAction(
  Type.INCREASE_MOVEMENTS,
  () => ({ }),
);

const reset = createAction(
  Type.RESET,
  () => ({ }),
);

export const SessionActions = {
  Type,
  end,
  increaseMovements,
  reset,
};

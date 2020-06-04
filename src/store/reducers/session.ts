import { handleActions } from 'redux-actions';
import { SessionActions } from '../actions';
import { ISession } from '../../types';

const initialState: ISession = {
  movements: 0,
};

export const SessionReducer = handleActions<ISession, ISession>({
  [SessionActions.Type.END]:
      (state) => ({ ...state, end: new Date() }),
  [SessionActions.Type.INCREASE_MOVEMENTS]:
      (state) => {
        if (state.start) {
          return {
            ...state, movements: state.movements + 1,
          };
        }
        return {
          ...state, movements: state.movements + 1, start: new Date(),
        };
      },
  [SessionActions.Type.RESET]:
        () => ({ movements: 0 }),
}, initialState);

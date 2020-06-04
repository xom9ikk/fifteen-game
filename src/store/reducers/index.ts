import { combineReducers } from 'redux';
import { IRootState } from './state';
import { SessionReducer } from './session';

export const rootReducer = combineReducers<IRootState>({
  session: SessionReducer as any,
});

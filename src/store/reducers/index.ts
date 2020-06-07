import { combineReducers } from 'redux';
import { IRootState } from './state';
import { SessionReducer } from './session';
import { ThemeReducer } from './theme';

export const rootReducer = combineReducers<IRootState>({
  session: SessionReducer as any,
  theme: ThemeReducer as any,
});

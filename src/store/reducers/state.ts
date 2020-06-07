import {
  EnumTheme,
  ISession,
} from '../../types';

export interface IRootState {
  session: ISession,
  theme: EnumTheme,
}

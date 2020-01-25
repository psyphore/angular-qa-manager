import { EnumsResponse } from '../../shared/interfaces/enums.interface';

export interface State {
  values: EnumsResponse;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  values: null,
  isLoading: false,
  error: null
};

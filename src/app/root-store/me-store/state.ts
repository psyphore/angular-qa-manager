import { Me } from '../../shared/interfaces/security.interface';

export interface State {
  profile: Me;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  profile: null,
  isLoading: false,
  error: null
};

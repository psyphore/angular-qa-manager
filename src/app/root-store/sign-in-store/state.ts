export interface State {
  token: string;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  token: null,
  isLoading: false,
  error: null
};

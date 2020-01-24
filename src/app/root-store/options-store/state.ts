import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EnumsResponse } from '../../shared/interfaces/enums.interface';

export const featureAdapter: EntityAdapter<EnumsResponse> = createEntityAdapter<
  EnumsResponse
>();

export interface State {
  values: EnumsResponse;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  values: null,
  isLoading: false,
  error: null
});

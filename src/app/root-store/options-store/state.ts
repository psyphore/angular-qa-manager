import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EnumsResponse } from '../../shared/interfaces/enums.interface';

export const featureAdapter: EntityAdapter<EnumsResponse> = createEntityAdapter<
  EnumsResponse
>();

export interface State extends EntityState<EnumsResponse> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null
});

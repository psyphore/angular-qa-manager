import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Me } from '../../shared/interfaces/security.interface';

export const featureAdapter: EntityAdapter<Me> = createEntityAdapter<Me>();

export interface State extends EntityState<Me> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null
});

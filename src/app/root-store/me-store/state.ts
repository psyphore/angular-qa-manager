import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Me } from '../../shared/interfaces/security.interface';

export const featureAdapter: EntityAdapter<Me> = createEntityAdapter<Me>();

export interface State {
  profile: Me;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  profile: null,
  isLoading: false,
  error: null
});

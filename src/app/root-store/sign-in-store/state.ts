import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SignIn } from '../../shared/interfaces/security.interface';

export const featureAdapter: EntityAdapter<SignIn> = createEntityAdapter<
  SignIn
>({
  selectId: model => model.login.jwt,
  sortComparer: (a: SignIn, b: SignIn): number =>
    b.login.jwt.localeCompare(a.login.jwt)
});

export interface State extends EntityState<SignIn> {
  token: string;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  token: null,
  isLoading: false,
  error: null
});

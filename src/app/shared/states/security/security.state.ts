import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { SignIn } from '@models/security.interface';

export const securityAdapter = createEntityAdapter<SignIn>();
export interface SecurityState extends EntityState<SignIn> {}

export function securityInitialState(): SecurityState {
  return securityAdapter.getInitialState();
}

export const featureAdapter: EntityAdapter<SignIn> = createEntityAdapter<
  SignIn
>({
  selectId: model => model.login.jwt,
  sortComparer: (a: SignIn, b: SignIn): number =>
    b.login.jwt.toString().localeCompare(a.login.jwt.toString())
});

export interface State extends EntityState<SignIn> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = featureAdapter.getInitialState({
  isLoading: false,
  error: null
});

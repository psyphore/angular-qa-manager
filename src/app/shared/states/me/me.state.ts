import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import { Me } from '@models/security.interface';

export const meAdapter = createEntityAdapter<Me>();
export interface MeState extends EntityState<Me> {}
export function meInitialState(): MeState {
  return meAdapter.getInitialState();
}

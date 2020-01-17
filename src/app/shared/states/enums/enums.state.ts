import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';

import { EnumsResponse } from '@models/enums.interface';

export const enumsAdapter = createEntityAdapter<EnumsResponse>();
export interface EnumsState extends EntityState<EnumsResponse> {}

export function enumsInitialState(): EnumsState {
  return enumsAdapter.getInitialState();
}

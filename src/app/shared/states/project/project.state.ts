import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';

import { Release } from '@models/release.interface';

export const releaseAdapter = createEntityAdapter<Release>();
export interface ReleaseState extends EntityState<Release> {}

export function releaseInitialState(): ReleaseState {
  return releaseAdapter.getInitialState();
}

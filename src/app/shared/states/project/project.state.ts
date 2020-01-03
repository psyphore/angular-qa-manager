import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';

import { Release, Issue } from '@models/project.interface';
import { EnumsReponse } from '@models/enums.interface';

export const releaseAdapter = createEntityAdapter<Release>();
export interface ReleaseState extends EntityState<Release> {}

export const issueAdapter = createEntityAdapter<Issue>();
export interface IssueState extends EntityState<Issue> {}

export const enumsAdapter = createEntityAdapter<EnumsReponse>();
export interface EnumsState extends EntityState<EnumsReponse> {}

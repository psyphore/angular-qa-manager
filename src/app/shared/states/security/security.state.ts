import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import { SignIn, Me } from '@models/security.interface';

export const securityAdapter = createEntityAdapter<SignIn>();
export interface SecurityState extends EntityState<SignIn> {}

export const meAdapter = createEntityAdapter<Me>();
export interface MeState extends EntityState<Me> {}

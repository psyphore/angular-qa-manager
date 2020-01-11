import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import { SignIn } from '@models/security.interface';

export const securityAdapter = createEntityAdapter<SignIn>();
export interface SecurityState extends EntityState<SignIn> {}

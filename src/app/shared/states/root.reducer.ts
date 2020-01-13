import { apolloReducer } from 'apollo-angular-cache-ngrx';
import { projectReducer, enumsReducer } from './project';
import { personReducer } from './person';
import { SecurityRed } from './security';
import { MeRed } from './me';

export const reducers = {
  apollo: apolloReducer,
  project: projectReducer,
  enums: enumsReducer,
  person: personReducer,
  security: SecurityRed,
  me: MeRed
};

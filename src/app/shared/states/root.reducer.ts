import { apolloReducer } from 'apollo-angular-cache-ngrx';
import { projectReducer, enumsReducer } from './project';
import { personReducer } from './person';
import { securityReducer, meReducer } from './security';

export const reducers = {
  apollo: apolloReducer,
  project: projectReducer,
  enums: enumsReducer,
  person: personReducer,
  security: securityReducer,
  me: meReducer
};

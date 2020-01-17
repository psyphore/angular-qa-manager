import { apolloReducer } from 'apollo-angular-cache-ngrx';
import { projectReducer } from './project';
import { issueReducer } from './issue';
import { enumsReducer } from './enums';
import { personReducer } from './person';
import { SecurityReducer } from './security';
import { MeReducer } from './me';

export const reducers = {
  apollo: apolloReducer,
  project: projectReducer,
  task: issueReducer,
  enums: enumsReducer,
  person: personReducer,
  security: SecurityReducer,
  me: MeReducer
};

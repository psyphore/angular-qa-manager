import { projectReducer } from './project';
import { issueReducer } from './issue';
import { enumsReducer } from './enums';
import { personReducer } from './person';
import { SecurityReducer } from './security';
import { MeReducer } from './me';

export const reducers = {
  release: projectReducer,
  issue: issueReducer,
  enums: enumsReducer,
  person: personReducer,
  security: SecurityReducer,
  me: MeReducer
};

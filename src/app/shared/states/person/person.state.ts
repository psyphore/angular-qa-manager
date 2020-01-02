import { Person } from '@models/person.interface';

export interface PersonState {
  entities: { [key: string]: Person };
  entity: Person;
}

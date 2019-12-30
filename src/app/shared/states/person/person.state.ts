import { Person } from '@models/person.interface';

export interface PersonState {
  ids: number[];
  entities: { [key: string]: Person };
}

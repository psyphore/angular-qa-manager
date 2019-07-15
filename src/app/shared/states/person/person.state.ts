import { Person } from '../../interfaces/person.interface';

export interface PersonState {
  ids: number[];
  entities: { [key: string]: Person };
}

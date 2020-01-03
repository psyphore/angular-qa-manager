import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import { Person } from '@models/person.interface';

export const personAdapter = createEntityAdapter<Person>();
export interface PersonState extends EntityState<Person> {}

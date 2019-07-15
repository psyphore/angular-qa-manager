import { Project } from '@models/project.interface';
export interface ProjectState {
  ids: number[];
  entities: { [key: string]: Project };
}

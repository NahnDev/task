import { Project } from './global';

export type TProject = Project;
export type TProjectRef = Pick<TProject, '_id' | 'name'>;

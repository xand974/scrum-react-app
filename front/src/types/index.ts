export interface SprintModel {
  id?: string;
  createdAt: string;
  from: string;
  name: string;
  to: string;
  review?: string;
  tasks?: TaskModel[];
  states: string[];
}

export interface TaskModel {
  id?: string;
  job: string;
  state: string;
  name: string;
  team: string[];
}

export interface UserModel {
  PhotoURL?: string;
  email: string;
  job?: string;
}

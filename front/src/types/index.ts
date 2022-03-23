export interface SprintModel {
  id?: string;
  createdAt: string;
  from: string;
  name: string;
  to: string;
  review?: string;
  tasks?: TaskModel[];
}

export interface TaskModel {
  id?: string;
  job: string;
  state: "pending" | "fait" | "backlog" | "check";
  task: string;
  team: string[];
}

export interface UserModel {
  PhotoURL?: string;
  email: string;
  job?: string;
}

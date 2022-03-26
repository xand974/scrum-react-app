import "./sprintcat.scss";
import SprintCard from "../sprintCard/SprintCard";
import { useEffect, useState } from "react";
import { TaskModel, SprintModel } from "../../types/index";
import { useAppSelector } from "../../hook";

export default function SprintCategory({
  state,
  SPRINT_ID,
}: {
  state: string;
  SPRINT_ID: string;
}) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const { sprints } = useAppSelector((state) => state.sprints);
  const [sprint, setSprint] = useState({} as SprintModel);

  useEffect(() => {
    const sprintFound =
      sprints.find((sprint) => sprint.id === SPRINT_ID) ?? ({} as SprintModel);
    setSprint((prev) => ({
      ...prev,
      ...sprintFound,
    }));
  }, [SPRINT_ID, sprints]);

  useEffect(() => {
    const getTaskByState = (state: string): TaskModel[] => {
      let res: TaskModel[] = [];
      if (sprint.tasks)
        for (const task of sprint?.tasks) {
          if (task.state === state) {
            res.push(task);
          }
        }
      return res;
    };
    setTasks(getTaskByState(state));
  }, [state, sprint]);

  return (
    <div className="sprint-cat">
      <div className="top">
        <p className={`sprint-cat_text ${state || ""}`}>{state}</p>
      </div>
      <div className="bottom">
        {tasks.map((item, key) => (
          <SprintCard key={key} id={item?.id} item={item} />
        ))}
      </div>
      <div className="transparent-container"></div>
    </div>
  );
}

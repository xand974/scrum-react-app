import "./sprintcat.scss";
import SprintCard from "../sprintCard/SprintCard";
import { useEffect, useState } from "react";
import { TaskModel } from "../../types/index";
import { useAppSelector } from "../../hook";

export default function SprintCategory({ type }: { type: string }) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const { sprint } = useAppSelector((state) => state.sprints);

  useEffect(() => {
    const getTaskByState = (type: string): TaskModel[] => {
      let res: TaskModel[] = [];
      if (sprint.tasks)
        for (const task of sprint?.tasks) {
          if (task.state === type) {
            res.push(task);
          }
        }
      return res;
    };
    setTasks(getTaskByState(type));
  }, [type, sprint]);

  return (
    <div className="sprint-cat">
      <div className="top">
        <p className={`sprint-cat_text ${type || ""}`}>{type}</p>
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

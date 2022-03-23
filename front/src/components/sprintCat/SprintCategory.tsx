import "./sprintcat.scss";
import SprintCard from "../sprintCard/SprintCard";
import { useEffect, useState } from "react";
import { getTaskByState } from "../../context/apiCalls";
import { useLocation } from "react-router";
import { TaskModel } from "../../types/index";

export default function SprintCategory({ type }: { type: string }) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const location = useLocation();
  const SPRINT_ID = location.pathname.split("/")[2];

  useEffect(() => {
    getTaskByState(SPRINT_ID, type, setTasks);
  }, [type, SPRINT_ID]);

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

import "./sprintcat.scss";
import SprintCard from "../sprintCard/SprintCard";
import { useEffect, useState } from "react";
import { getTaskByState } from "../../context/apiCalls";
import { useLocation } from "react-router";
export default function SprintCategory({ type }) {
  const [tasks, setTasks] = useState([]);
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
          <SprintCard key={key} id={item.id} item={item.data} />
        ))}
      </div>
    </div>
  );
}

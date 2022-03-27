import "./sprintcat.scss";
import SprintCard from "../sprintCard/SprintCard";
import { useEffect, useRef, useState } from "react";
import { TaskModel, SprintModel } from "../../types/index";
import { useAppSelector } from "../../hook";
import { getDragAfterElement } from "../../helpers/array-helper";

export default function SprintCategory({
  state,
  SPRINT_ID,
}: {
  state: string;
  SPRINT_ID: string;
}) {
  //#region variables
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const { sprints } = useAppSelector((state) => state.sprints);
  const [sprint, setSprint] = useState({} as SprintModel);
  const container = useRef<HTMLDivElement>(null);
  //#endregion
  //#region useEffect
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
  //#endregion
  //#region drag
  const dragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.add("dragging");
  };
  const dragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove("dragging");
  };
  const dragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const draggable = document.querySelector(".dragging") as HTMLDivElement;
    const afterElement = getDragAfterElement(e.clientY, container);
    console.log(afterElement);

    if (afterElement == null) {
      container.current?.appendChild(draggable);
    } else {
      container.current?.insertBefore(draggable, afterElement);
    }
  };

  //#endregion
  return (
    <div className="sprint-cat">
      <div className="top">
        <p className={`sprint-cat_text ${state || ""}`}>{state}</p>
      </div>
      <div className="bottom" ref={container} onDragOver={dragOver}>
        {tasks.map((item, key) => (
          <SprintCard
            dragEnd={dragEnd}
            dragStart={dragStart}
            key={key}
            id={item?.id}
            item={item}
          />
        ))}
      </div>
      <div className="transparent-container"></div>
    </div>
  );
}

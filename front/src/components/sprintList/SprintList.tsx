import "./sprintlist.scss";
import SprintListItem from "../sprintListItem/SprintListItem";
import { useEffect } from "react";
import { getSprints } from "../../services/sprint-service";
import { useAppSelector, useAppDispatch } from "../../hook";

export default function SprintList() {
  const { sprints } = useAppSelector((state) => state.sprints);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSprints(dispatch);
  }, [dispatch]);

  return (
    <div className="sprints">
      <div className="wrapper">
        {sprints.map((sprint, key) => (
          <SprintListItem sprint={sprint} key={key} />
        ))}
      </div>
    </div>
  );
}

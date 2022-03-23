import "./sprintlist.scss";
import SprintListItem from "../sprintListItem/SprintListItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSprints } from "../../context/apiCalls";
import { useAppSelector } from "../../hook";

export default function SprintList() {
  const { sprints } = useAppSelector((state) => state.sprints);
  const dispatch = useDispatch();

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

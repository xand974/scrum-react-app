import "./sprintlist.scss";
import SprintListItem from "../sprintListItem/SprintListItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSprints } from "../../context/apiCalls";
export default function SprintList() {
  const { sprints } = useSelector((state) => state.sprints);
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

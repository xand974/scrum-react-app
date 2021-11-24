import "./sprintlist.scss";
import SprintListItem from "../sprintListItem/SprintListItem";
export default function SprintList() {
  return (
    <div className="sprints">
      <div className="wrapper">
        <SprintListItem />
      </div>
    </div>
  );
}

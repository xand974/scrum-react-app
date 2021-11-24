import "./sprintcat.scss";
import SprintCard from "../sprintCard/SprintCard";
export default function SprintCategory({ type }) {
  return (
    <div className="sprint-cat">
      <div className="top">
        <p className={`sprint-cat_text ${type || ""}`}>{type}</p>
      </div>
      <div className="bottom">
        <SprintCard />
        <SprintCard />
        <SprintCard />
        <SprintCard />
        <SprintCard />
      </div>
    </div>
  );
}

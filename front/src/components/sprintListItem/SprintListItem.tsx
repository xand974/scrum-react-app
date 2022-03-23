import "./sprintlistitem.scss";
import { Link } from "react-router-dom";
import { SprintModel } from "../../types/index";

type SprintListItemType = {
  sprint: SprintModel;
};
export default function SprintListItem({ sprint }: SprintListItemType) {
  return (
    <div className="sprint-list-item">
      <h2 className="sprint-list-item_title">{sprint.name}</h2>
      <p className="sprint-list-item_date">
        {sprint.from} au {sprint.to}
      </p>
      <div className="links">
        <Link to={`/review/${sprint?.id}`}>
          <span className="links-text">
            Voir le <strong>Sprint Review</strong>
          </span>
        </Link>
        <Link to={`/sprint/${sprint?.id}`}>
          <span className="links-text">
            Voir les <strong>détails</strong>
          </span>
        </Link>
      </div>
    </div>
  );
}

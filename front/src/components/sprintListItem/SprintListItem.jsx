import "./sprintlistitem.scss";
import { Link } from "react-router-dom";
export default function SprintListItem({ sprint }) {
  return (
    <div className="sprint-list-item">
      <h2 className="sprint-list-item_title">{sprint.data.name}</h2>
      <p className="sprint-list-item_date">
        {sprint.data.from} au {sprint.data.to}
      </p>
      <div className="links">
        <Link to={`/review/${sprint.id}`}>
          <span className="links-text">
            Voir le <strong>Sprint Review</strong>
          </span>
        </Link>
        <Link to={`/sprint/${sprint.id}`}>
          <span className="links-text">
            Voir les <strong>détails</strong>
          </span>
        </Link>
      </div>
    </div>
  );
}

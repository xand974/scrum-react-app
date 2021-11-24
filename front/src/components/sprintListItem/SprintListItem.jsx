import "./sprintlistitem.scss";
import { Link } from "react-router-dom";
export default function SprintListItem() {
  return (
    <div className="sprint-list-item">
      <h2 className="sprint-list-item_title">Product</h2>
      <p className="sprint-list-item_date">12 Octobre au 19 octobre</p>
      <div className="links">
        <Link to="/review/:id">
          <span className="links-text">
            Voir le <strong>Sprint Review</strong>
          </span>
        </Link>
        <Link to="/sprint/1037">
          <span className="links-text">
            Voir les <strong>détails</strong>
          </span>
        </Link>
      </div>
    </div>
  );
}

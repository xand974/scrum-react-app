import "./sprintcard.scss";
import { Menu } from "@mui/icons-material";

export default function SprintCard({ item }) {
  return (
    <div className="sprint-card">
      <div className="sprint-card-header">
        <p className="card-title">{item.job}</p>
        <span className="card-drag-text">
          <Menu className="card-logo" />
        </span>
      </div>
      <div className="sprint-card-body">
        <p className="sprint-card_title">{item.task}</p>
        <div className="card-users">
          {/* {item.team.map((t, key) => (
            <img
              key={key}
              width="30"
              height="30"
              className="card-img"
              src="https://images.unsplash.com/photo-1637682718193-9af58ff9c338?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="utilisateur travaillant pour le sprint"
              style={{ transform: `translateX(-${10 * key}px)` }}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}

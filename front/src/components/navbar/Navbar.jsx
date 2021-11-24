import "./navbar.scss";
import { Brightness2Outlined, AddOutlined } from "@mui/icons-material";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { getUser } from "../../context/apiCalls";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(auth.currentUser.uid, setUser);
  }, []);
  return (
    <header>
      <nav className="nav">
        <div className="left">
          <Brightness2Outlined fontSize="large" className="nav-icon" />
          <h1 className="nav-title">SCRUM TOOL - MASTER 2 LEA NPI</h1>
        </div>
        <div className="right">
          <div className="profile">
            <Link to="/create" className="profile-link">
              <AddOutlined className="profile-icon" color="info" />
            </Link>
            <img
              className="profile-img"
              src={user?.PhotoURL}
              alt="illustration de l'utilisateur"
            />
            <span className="profile-text">{user?.email}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

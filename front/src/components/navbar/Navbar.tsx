import "./navbar.scss";
import { Brightness2Outlined, AddOutlined } from "@mui/icons-material";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { getUser } from "../../services/user-service";
import { logout } from "../../services/login-service";
import { Link, useNavigate } from "react-router-dom";
import { UserModel } from "../../types/index";
import MenuContext from "../menu-context/MenuContext";
export default function Navbar() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    {
      text: "Edit profile",
      tag: "edit-profile",
      icon: "Edit",
    },
    {
      text: "Create a sprint",
      tag: "create-a-sprint",
      icon: "Add",
    },
    {
      text: "Logout",
      tag: "logout",
      icon: "Logout",
    },
  ];

  const handleClick = (tag: string) => {
    switch (tag) {
      case "edit-profile":
        // TODO edit profile page
        alert("edit profile");
        break;
      case "create-a-sprint":
        navigate("/create");
        break;
      case "logout":
        logout(navigate);
        break;
    }
  };

  useEffect(() => {
    if (auth !== null) getUser(auth?.currentUser?.uid!!, setUser);
  }, []);
  return (
    <header>
      <nav className="nav">
        <div className="left">
          <Link to="/" className="nav-link">
            <Brightness2Outlined fontSize="large" className="nav-icon" />
            <h1 className="nav-title">
              Traductions de brochures - MASTER 2 LEA NPI
            </h1>
          </Link>
        </div>
        <div className="right">
          <div className="profile">
            <Link to="/create" className="profile-link">
              <AddOutlined className="profile-icon" color="info" />
            </Link>
            <div
              className="dropdown"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <img
                className="profile-img"
                src={user?.PhotoURL}
                alt="illustration de l'utilisateur"
              />
              <span className="profile-text">{user?.email}</span>
              <div className={`dropdown-items ${hover ? "active" : ""}`}>
                {menuItems.map((item, index) => (
                  <MenuContext
                    key={index}
                    text={item.text}
                    tag={item.tag}
                    handleClick={handleClick}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/images/whiteLogo.png";
import AuthContext from "../../context/AuthContext";
import AccountCircle from "../../assets/images/account_circle.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    if (currentUser) {
      setImage(currentUser.photo || null);
    }
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [currentUser]);

  const closeDropdown = (event) => {
    if (!event.target.classList.contains("avatar")) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent event from propagating to the window
    setIsOpen(!isOpen);
  };

  const handleLoginOrRegisterPage = (page) => {
    if (page === "login") {
      navigate("/login");
    } else if (page === "signup") {
      navigate("/signup");
    }
  };

  return (
    <div className="header">
     <div className="right-header">
     <Link to="/">
        {" "}
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <Link className="link-style" to="/">Explore</Link>

      <Link className="link-style" to="/photographers">Photographers</Link>
     </div>

      {currentUser ? (
        <div className="dropdown">
          {image ? (
            <img
              onClick={(event) => {
                console.log("Image clicked!");
                toggleDropdown(event);
              }}
              alt={currentUser.username}
              src={image}
              className="avatar"
            />
          ) : (
            <img
              onClick={(event) => {
                console.log("Image clicked!");
                toggleDropdown(event);
              }}
              alt={currentUser.username}
              src={AccountCircle}
              className="avatar"
            />
          )}

          {isOpen && (
            <div className="dropdown-content">
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link to={`/creator-profile/${currentUser.username}`}>Profile</Link>
              <Link onClick={() => logout()}>Logout</Link>
            </div>
          )}
        </div>
      ) : (
        <div className="buttonGroup">
          <button
            onClick={() => handleLoginOrRegisterPage("login")}
            className="outlineBtn"
          >
            LOGIN
          </button>
          <button
            onClick={() => handleLoginOrRegisterPage("signup")}
            className="backgroundBtn"
          >
            SIGNUP
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

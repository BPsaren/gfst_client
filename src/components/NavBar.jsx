
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaHome, FaUser, FaRegistered } from "react-icons/fa";
import { BiSolidContact } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
import "./NavBar.css";

export const NavBar = () => {
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <h1>
            <span>Gol</span>den Future <span>Suppor</span>tive <span>Trust</span>
          </h1>
        </div>
        <nav className="navbar">
          <FaBars className="hamburger" onClick={toggleMenu} />
          <ul className={menuOpen ? "show" : ""}>
            <li>
              <NavLink to="/" className="nav-link">
                <FaHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                <VscOrganization />
                <span>About</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                <BiSolidContact />
                <span>Contact</span>
              </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" className="nav-link">
                  <span>Logout</span>
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="nav-link">
                    <FaRegistered />
                    <span>Register</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="nav-link">
                    <FaUser />
                    <span>Login</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};



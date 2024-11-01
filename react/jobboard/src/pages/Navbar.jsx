// Navbar.js
import React, { useEffect, useState } from 'react';
import logomarianne from '../images/header-logo2021-marianne.svg';
import logofrancetravail from '../images/France-travail-2023.svg.png';
import loupe from '../images/loupe.png';
import '../style.css'; 
import { Link } from "react-router-dom"
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // hamburger
  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        setUser(storedUser);
    }
  }, [])

  const handleLogout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const refreshToken = storedUser?.refreshToken;

      const decodedToken = jwtDecode(storedUser.accessToken);
      const currentDate = new Date();

      if(decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Access token expired. Refreshing...");

        const res = await axios.post("http://localhost:8800/refresh", { token: refreshToken });
        user.accessToken = res.data.accessToken;
        user.refreshToken = res.data.refreshToken;
        localStorage.setItem("user", JSON.stringify(user))
      }

      await axiosInstance.post("http://localhost:8800/logout", {
        token: user.refreshToken,
      }, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
        },
      });

      localStorage.removeItem("user");  // Clear user data from local storage
      setUser(null);  // Reset user state to null after logout
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  
  
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="left-section">
          <button className="hamburger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <img src={logomarianne} alt="Logo Marianne" className="logomarianne" />

        <Link to = "/">
            <img src={logofrancetravail} alt="Logo France Travail" className="logomarianne" />
        </Link>
    
        </div>
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to ="/">Accueil</Link></li>
            <li><a href="#services">Nos services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="right-section">
            {user ? (
                <>
                    <Link to = "/Dashboard" className="btn-connexion">{user.username}</Link>
                    <button className="logOut" onClick={handleLogout}>Déconnexion</button>
                </>
            ) : (
                <a href="/Login" className="btn-connexion">Connexion</a>
            )
            }
            <button className="search-icon" id="search-icon">
                <img src={loupe} alt="Recherche" className="loupe" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

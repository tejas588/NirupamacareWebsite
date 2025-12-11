import React from "react";
import "./Homepage.css"; // Optional: If you want to separate styling
import logo from "../assets/logo.png";


const Homepage = () => {
  return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Nirupama Care Logo" className="logo" />

          <h2 className="brand-name"></h2>
        </div>
      </nav>

      {/* Main Section */}
      <div className="hero-box">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Personal Health Guide,
            <br />
            Powered by AI
          </h1>

          <p className="hero-subtext">
            Nirupama Care helps you find the right doctor, book appointments,  
            and manage your healthcare needs easily and intelligently.  
            Choose your preferred language to begin.
          </p>

          <div className="btn-group">
            <button className="btn-primary">বাংলায় চালিয়ে যান</button>
            <button className="btn-secondary">Continue in English</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/*<footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Nirupama Care. All rights reserved.
        </p>
      </footer>*/}

    </div>
  );
};

export default Homepage;

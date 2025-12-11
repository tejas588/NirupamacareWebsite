import React from "react";
import Homepage from "./components/Homepage";
import "./App.css";

function App() {
  return (
    <div className="app-container">

      {/* MAIN CONTENT WRAPPER (pushes footer to bottom) */}
      <div className="main-content">
        <Homepage />
      </div>

      {/* GLOBAL FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>

        <div className="footer-text">
          © 2025 Nirupamacare. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default App;

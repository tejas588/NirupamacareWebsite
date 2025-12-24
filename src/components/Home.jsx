import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- Symptom Checker State ---
  const [symptomDesc, setSymptomDesc] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- NEW: Auth State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple hook to trigger animations on load & Check Login
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);

    // --- NEW: Check if user is logged in ---
    // We check if a 'token' exists in localStorage (or check your Supabase session)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // --- Logic to analyze symptoms ---
  const handleAnalyzeSymptoms = () => {
    // 1. SECURITY CHECK: Redirect if not logged in
    if (!isLoggedIn) {
      // Optional: Save what they typed so it's there when they come back?
      // localStorage.setItem('temp_symptom', symptomDesc); 
      alert("You need to login to use the AI Symptom Checker.");
      navigate('/login');
      return;
    }

    // 2. Validate Input
    if (!symptomDesc.trim()) {
        alert("Please describe your symptoms.");
        return;
    }

    setIsAnalyzing(true);
    setSuggestion(null);

    // Simulate a delay for "Analysis"
    setTimeout(() => {
      const text = symptomDesc.toLowerCase();
      let doctorType = "General Physician";
      let reason = "For a general checkup and initial diagnosis.";

      // Simple Keyword Matching Logic
      if (text.includes('tooth') || text.includes('gum') || text.includes('jaw')) {
        doctorType = "Dentist";
        reason = "It sounds like a dental issue.";
      } else if (text.includes('heart') || text.includes('chest') || text.includes('beat')) {
        doctorType = "Cardiologist";
        reason = "Chest or heart issues require a specialist.";
      } else if (text.includes('skin') || text.includes('rash') || text.includes('itch')) {
        doctorType = "Dermatologist";
        reason = "For skin related conditions.";
      } else if (text.includes('bone') || text.includes('fracture') || text.includes('joint')) {
        doctorType = "Orthopedic";
        reason = "For bone and joint health.";
      } else if (text.includes('stomach') || text.includes('digest') || text.includes('vomit')) {
        doctorType = "Gastroenterologist";
        reason = "For digestive system issues.";
      }

      setSuggestion({ type: doctorType, message: reason });
      setIsAnalyzing(false);
    }, 1500); // 1.5 second delay
  };

  const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
  };

  return (
    <div className="home-wrapper">
      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-left">
            <div className="logo" onClick={() => navigate('/')}>
              <img src="nirupama1.png" alt="" className='nirupama-logo'/>
            </div>
            <ul className="primary-nav desktop-only">
              <li><a href="/doctors" className="active-link">Get Doctor</a></li>
              <li><a href="/video-consult">Video Consult</a></li>
              <li><a href="/lab-tests">Book Lab Test</a></li>
            </ul>
          </div>

          <div className="nav-right desktop-only">
            <a href="/for-doctors" className="nav-link-secondary">For doctors</a>
            <a href="/security" className="nav-link-secondary">Security</a>
            <a href="/help" className="nav-link-secondary">Help</a>
            
            
            {/* Conditional Rendering for Login/Logout */}
            {isLoggedIn ? (
                <button className="btn-login" onClick={handleLogout}>
                  Logout
                </button>
            ) : (
                <button className="btn-login" onClick={() => navigate('/login')}>
                  Login / Signup
                </button>
            )}
          </div>

          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero-section">
        <div className={`hero-content ${loaded ? 'fade-in-up' : ''}`}>
          <div className="hero-text">
            <h1>Your Health, <br /> Our <span className="highlight">Priority</span></h1>
            <p>
              Experience the future of healthcare. Book appointments with top 
              specialists, consult online, or order medicines—all in one place.
            </p>
            
            <div className="search-box-container">
              <div className="search-box">
                <div className="search-input location">
                  <span className="icon">📍</span>
                  <input type="text" placeholder="West Bengal" />
                </div>
                <div className="search-input main-search">
                  <span className="icon">🔍</span>
                  <input type="text" placeholder="Search doctors, clinics, hospitals..." />
                </div>
                <button className="btn-search">Search</button>
              </div>
            </div>

            <div className="hero-stats">
              <div className="hero-badges">
                <div className="badge-item">
                   <span className="badge-icon">🛡️</span> <span>Data Privacy</span>
                </div>
                <div className="badge-item">
                   <span className="badge-icon">👨‍⚕️</span> <span>Verified Doctors</span>
                </div>
                <div className="badge-item">
                    <span className="badge-icon">⚡</span> <span>Instant Booking</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-bg-blob"></div>
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop" 
              alt="Doctor and Patient" 
              className="main-img"
            />
          </div>
        </div>
      </header>

      {/* --- NEW SECTION: SYMPTOM CHECKER --- */}
      <section className="symptom-section">
        <div className="symptom-container">
          <div className="symptom-left">
            <h2>Not sure who to consult?</h2>
            <p>Describe your symptoms below and our AI assistant will suggest the right specialist for you.</p>
            
            <textarea 
              className="symptom-input" 
              rows="3"
              // Placeholder changes based on login status
              placeholder={isLoggedIn 
                ? "E.g., I have a severe toothache and sensitivity to cold water..." 
                : "Please login to describe your symptoms..."}
              value={symptomDesc}
              onChange={(e) => setSymptomDesc(e.target.value)}
              // Optional: Disable typing if not logged in
              // disabled={!isLoggedIn} 
            ></textarea>

            <button 
              className="btn-analyze" 
              onClick={handleAnalyzeSymptoms}
              disabled={isAnalyzing}
            >
              {isAnalyzing 
                ? 'Analyzing...' 
                : (isLoggedIn ? 'Analyze Symptoms' : 'Login to Analyze')}
            </button>
          </div>

          <div className="symptom-right">
            {suggestion ? (
              <div className="suggestion-card fade-in">
                <div className="suggestion-icon">🩺</div>
                <h3>You should see a:</h3>
                <h2 className="doctor-type">{suggestion.type}</h2>
                <p>{suggestion.message}</p>
                <button className="btn-book-now" onClick={() => navigate('/doctors')}>
                  Book {suggestion.type}
                </button>
              </div>
            ) : (
              <div className="suggestion-placeholder">
                <span style={{fontSize: '3rem'}}>🤖</span>
                <p>Results will appear here</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- SERVICES / SPECIALTIES --- */}
      <section className="services-section">
        <div className="section-header">
          <h2>Top Specialties</h2>
          <p>Consult with experts in various fields</p>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3004/3004458.png" alt="Dentist" />
            <h3>Dentist</h3>
            <p>Teething troubles?</p>
          </div>
          <div className="service-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" alt="Cardiology" />
            <h3>Cardiology</h3>
            <p>For a healthy heart</p>
          </div>
          <div className="service-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3209/3209045.png" alt="Nutrition" />
            <h3>Nutrition</h3>
            <p>Diet & Wellness</p>
          </div>
          <div className="service-card">
            <img src="https://cdn-icons-png.flaticon.com/512/387/387561.png" alt="Surgery" />
            <h3>Surgery</h3>
            <p>Safe procedures</p>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Download the Nirupama App</h2>
          <p>Get access to doctors, lab reports, and prescriptions on the go.</p>
          <div className="app-buttons">
            <button className="btn-store">App Store</button>
            <button className="btn-store">Google Play</button>
          </div>
        </div>
        <div className="cta-image">
             <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80" alt="Mobile App" />
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import './LanguageSelect.css';
// import logo from './assets/nirupama-logo.png'; 

const LanguageSelect = () => {
  const [selectedLang, setSelectedLang] = useState(null);
  const navigate = useNavigate();

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' }
  ];

  const handleContinue = () => {
    if (selectedLang) {
      console.log("Language Selected:", selectedLang);
      // Navigate to the next page (e.g., Login)
      navigate('/home');
    }
  };

  return (
    <div className="lang-container">
      <div className="lang-card">
        <div className="lang-header">
           <img 
            src="nirupama1.png" 
            alt="Nirupama Care" 
            className="lang-logo" 
          />
          <h2>Welcome / স্বাগতম</h2>
          <p>Please select your preferred language</p>
        </div>

        <div className="lang-grid">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${selectedLang === lang.code ? 'active' : ''}`}
              onClick={() => setSelectedLang(lang.code)}
            >
              <span className="lang-native">{lang.native}</span>
              <span className="lang-label">{lang.label}</span>
              
              {selectedLang === lang.code && (
                <span className="checkmark">✔</span>
              )}
            </button>
          ))}
        </div>

        {/* Using a button with onClick handler is standard for form submissions,
           but if you strictly want a Link component structure for the button:
        */}
        <button 
          className="btn-continue" 
          disabled={!selectedLang}
          onClick={handleContinue}
        >
          Continue
        </button>

        {/* Alternative: If you just want a text link fallback */}
        {/* <div style={{marginTop: '15px'}}>
            <Link to="/login" style={{color: '#006D5B'}}>Skip for now</Link>
        </div> */}
      
      </div>
    </div>
  );
};

export default LanguageSelect;
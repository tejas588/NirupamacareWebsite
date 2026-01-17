import React, { useState } from 'react';
import { MapPin, Stethoscope, Save, CheckSquare, XSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import './DoctorProfileSetup.css';

const DoctorProfileSetup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- NEW: Toggles for Availability ---
  const [availability, setAvailability] = useState({
    clinic: true,  // Default: Clinic is Open
    online: false  // Default: Online is Closed
  });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    display_name: '',
    specialty: '',
    experience_years: '',
    credentials: '',
    clinic_name: '',
    clinic_address: '',
    city: '', // ✅ ADDED CITY FIELD
    price_clinic: '',
    price_online: '',
    bio: '',
    languages: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (type) => {
    setAvailability(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        experience_years: parseInt(formData.experience_years) || 0,
        // ✅ Logic to handle prices based on toggles
        price_clinic: availability.clinic ? (parseFloat(formData.price_clinic) || 0) : 0,
        price_online: availability.online ? (parseFloat(formData.price_online) || 0) : 0,
        languages: formData.languages.split(',').map(lang => lang.trim()).filter(l => l)
      };

      await api.createDoctorProfile(payload);
      alert("Doctor Profile Created Successfully!");
      navigate('/doctor-dashboard');

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save profile: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="doctor-setup-root">
      <nav className="doc-navbar">
        <div className="doc-nav-container">
          <div className="doc-logo" onClick={() => navigate('/')}>
            <img src="/nirupama1.png" alt="Logo" className="doc-logo-img" />
          </div>
        </div>
      </nav>

      <div className="doc-content-container">
        <div className="doc-card">
          <div className="doc-header">
            <h2><Stethoscope className="icon-blue" /> Doctor Registration</h2>
            <p className="sub-text">Build your digital clinic presence</p>
          </div>

          <form onSubmit={handleSubmit} className="doc-form">

            {/* 1. Basic Info */}
            <div className="form-section">
              <h3 className="section-title">Personal Details</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>First Name</label>
                  <input name="first_name" onChange={handleChange} required placeholder="Dr. John" />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input name="last_name" onChange={handleChange} required placeholder="Doe" />
                </div>
                <div className="input-group full-width">
                  <label>Display Name</label>
                  <input name="display_name" onChange={handleChange} placeholder="Dr. John Doe, MD" />
                </div>
              </div>
            </div>

            {/* 2. Professional Info */}
            <div className="form-section">
              <h3 className="section-title">Professional Info</h3>
              <div className="form-grid">
                <div className="input-group">
                  <label>Specialty</label>
                  <select name="specialty" onChange={handleChange} required>
                    <option value="">Select Specialty</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Neurologist">Neurologist</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Experience (Years)</label>
                  <input type="number" name="experience_years" onChange={handleChange} required placeholder="5" />
                </div>
                <div className="input-group full-width">
                  <label>Credentials</label>
                  <input name="credentials" onChange={handleChange} placeholder="MBBS, MD" />
                </div>
                <div className="input-group full-width">
                  <label>Languages</label>
                  <input name="languages" onChange={handleChange} placeholder="English, Hindi" />
                </div>
              </div>
            </div>

            {/* 3. Clinic & Pricing */}
            <div className="form-section">
              <h3 className="section-title">Clinic & Fees</h3>
              <div className="form-grid">

                <div className="input-group full-width">
                  <label>Clinic Name</label>
                  <input name="clinic_name" onChange={handleChange} placeholder="City Care Clinic" />
                </div>

                {/* ✅ ADDED: City Input (Critical for Search) */}
                <div className="input-group">
                  <label>City</label>
                  <input name="city" onChange={handleChange} required placeholder="e.g. Kolkata" />
                </div>

                <div className="input-group icon-input">
                  <MapPin size={18} className="input-icon" />
                  <input name="clinic_address" onChange={handleChange} placeholder="Full Address" style={{ paddingLeft: '40px' }} />
                </div>

                {/* Toggles */}
                <div className="input-group checkbox-group full-width">
                  <label className={`toggle-label ${availability.clinic ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={availability.clinic}
                      onChange={() => handleToggle('clinic')}
                    />
                    {availability.clinic ? <CheckSquare size={18} /> : <XSquare size={18} />}
                    <span>Available for In-Clinic Visits?</span>
                  </label>
                </div>

                {availability.clinic && (
                  <div className="input-group fade-in">
                    <label>Clinic Visit Fee (₹)</label>
                    <input type="number" name="price_clinic" onChange={handleChange} placeholder="500" required={availability.clinic} />
                  </div>
                )}

                <div className="input-group checkbox-group full-width" style={{ marginTop: '10px' }}>
                  <label className={`toggle-label ${availability.online ? 'active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={availability.online}
                      onChange={() => handleToggle('online')}
                    />
                    {availability.online ? <CheckSquare size={18} /> : <XSquare size={18} />}
                    <span>Available for Online Video Consult?</span>
                  </label>
                </div>

                {availability.online && (
                  <div className="input-group fade-in">
                    <label>Online Consult Fee (₹)</label>
                    <input type="number" name="price_online" onChange={handleChange} placeholder="300" required={availability.online} />
                  </div>
                )}

              </div>
            </div>

            {/* 4. Bio */}
            <div className="form-section">
              <h3 className="section-title">About You</h3>
              <div className="input-group full-width">
                <textarea name="bio" rows="4" onChange={handleChange} placeholder="Tell patients about your expertise..." className="bio-input"></textarea>
              </div>
            </div>

            <div className="action-footer">
              <button type="submit" className="doc-btn-primary" disabled={isSubmitting}>
                <Save size={20} /> {isSubmitting ? "Saving..." : "Create Doctor Profile"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileSetup;
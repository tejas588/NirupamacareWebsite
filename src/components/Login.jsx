import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    identifier: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // --- LOGIN LOGIC ---
      console.log('Login logic:', { 
        identifier: formData.identifier, 
        password: formData.password 
      });

      // 1. Simulate a successful backend response
      // In a real app, this comes from Supabase/API
      const fakeToken = "user_token_12345"; 

      // 2. Save token to localStorage
      // This is what Home.jsx checks to see if you are a "user"
      localStorage.setItem('token', fakeToken);

      // 3. Navigate to Home Page
      navigate('/home'); 

    } else {
      // --- SIGNUP LOGIC ---
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log('Signup logic:', formData);
      
      // On Signup, we usually send them to profile setup
      navigate('/userprofilesetup');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: '',
      identifier: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="login-wrapper">
      {/* --- Navbar Section --- */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
             <img src="nirupama1.png" className="logo-icon-img" alt="Logo" />   
          </div>
          
          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
            <div className={isMenuOpen ? "bar open" : "bar"}></div>
          </div>

          <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/doctors">Find Doctors</a></li>
            <li><a href="/help">Help</a></li>
          </ul>
        </div>
      </nav>

      {/* --- Auth Form Section --- */}
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="sub-text">
              {isLogin 
                ? 'Please login to access your health dashboard' 
                : 'Join us to manage your health journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group fade-in">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="identifier">Mobile Number or Email</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                placeholder="e.g. 9876543210 or user@email.com"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="input-group fade-in">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="form-actions">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="/forgot-password" className="forgot-pass">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="btn-primary">
              {isLogin ? 'Login' : 'Register'}
            </button>

            {isLogin && (
              <>
                <div className="divider">
                  <span>OR</span>
                </div>
                <button type="button" className="btn-secondary">
                  Login with OTP
                </button>
              </>
            )}
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={toggleAuthMode} className="toggle-link">
                {isLogin ? 'Register Now' : 'Login Here'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
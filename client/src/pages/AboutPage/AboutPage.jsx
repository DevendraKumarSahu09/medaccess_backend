import React from 'react';
import { Heart, Clock, Award, Users, Phone, Mail, MapPin } from 'lucide-react';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About MedAccess</h1>
        <p className="hero-subtitle">Committed to Excellence in Healthcare</p>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>At MediCare, we are dedicated to providing accessible, high-quality healthcare services to our community. Our mission is to improve lives through innovative medical solutions and compassionate care.</p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <Heart className="feature-icon" />
          <h3>Quality Care</h3>
          <p>We provide the highest standard of medical care with a focus on patient comfort and recovery.</p>
        </div>

        <div className="feature-card">
          <Clock className="feature-icon" />
          <h3>24/7 Service</h3>
          <p>Our facilities and emergency services are available round the clock for your medical needs.</p>
        </div>

        <div className="feature-card">
          <Award className="feature-icon" />
          <h3>Expert Doctors</h3>
          <p>Our team consists of highly qualified and experienced medical professionals.</p>
        </div>

        <div className="feature-card">
          <Users className="feature-icon" />
          <h3>Patient-Centric</h3>
          <p>We prioritize patient comfort and satisfaction in all our services.</p>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <h2>Our Journey</h2>
        <p>Founded in 2010, MediCare has grown from a small clinic to a comprehensive healthcare network. We've served over 100,000 patients and continue to expand our services to meet the growing healthcare needs of our community.</p>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Excellence</h3>
            <p>Striving for the highest quality in healthcare services</p>
          </div>
          <div className="value-item">
            <h3>Compassion</h3>
            <p>Treating every patient with care and empathy</p>
          </div>
          <div className="value-item">
            <h3>Innovation</h3>
            <p>Embracing new medical technologies and treatments</p>
          </div>
          <div className="value-item">
            <h3>Integrity</h3>
            <p>Maintaining the highest ethical standards in healthcare</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

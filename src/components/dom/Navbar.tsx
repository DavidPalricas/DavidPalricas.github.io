import React from 'react';
import { SECTIONS } from '../../config';
import './Navbar.css';

interface NavbarProps {
  activeSection: string | null;
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  return (
    <nav className="navbar-container" style={{ pointerEvents: 'auto' }}>
      {SECTIONS.map((section) => (
        <span 
          key={section.id} 
          className={`navbar-item ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => onNavigate(section.id)}
        >
          {section.label}
        </span>
      ))}
    </nav>
  );
};
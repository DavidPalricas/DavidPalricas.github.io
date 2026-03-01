import React from 'react';
import { SECTIONS } from '../../config';
import './Navbar.css';

interface NavbarProps {
  activeSection: string | null;
  hoveredSection: string | null; // Prop injetado
  onNavigate: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = React.memo(({ activeSection, hoveredSection, onNavigate }) => {
  return (
    <nav className="navbar-container" style={{ pointerEvents: 'auto' }}>
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;
        
        return (
          <span 
            key={section.id} 
            className={`navbar-item ${isActive ? 'active' : ''} ${isHovered && !isActive ? 'is-hovered' : ''}`}
            onClick={() => onNavigate(section.id)}
          >
            {section.label}
          </span>
        );
      })}
    </nav>
  );
});
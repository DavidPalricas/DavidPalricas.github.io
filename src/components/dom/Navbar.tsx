import React from 'react';
import { SECTIONS } from '../../config';
import './Navbar.css';

/**
 * Props for the top navigation bar.
 */
interface NavbarProps {
  activeSection: string | null;
  hoveredSection: string | null; // Injected prop.
  onNavigate: (id: string) => void;
}

/**
 * Renders the top-level section navigation.
 */
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
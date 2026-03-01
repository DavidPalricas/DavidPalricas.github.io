import React from 'react';
import './Navbar.css';

// Definição da estrutura de dados da navegação
const NAV_ITEMS = ['About', 'Experience', 'Projects', 'Contact'];

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar-container">
      {NAV_ITEMS.map((item) => (
        <span 
          key={item} 
          className="navbar-item"
          onClick={() => console.log(`Navegar para: ${item}`)}
        >
          {item}
        </span>
      ))}
    </nav>
  );
};
import React from 'react';
import { GAMEJAM_DATA, type GameJamRecord } from '../../../../data/gameJamsData';
import './GameJams.css';

interface GameJamsProps {
  onClose: () => void;
}

const GameJamNode: React.FC<{ data: GameJamRecord }> = React.memo(({ data }) => (
  <article className="jam-node">
    <div className="node-marker" />
    <div className="node-content">
      <header className="node-header">
        <h3 className="node-title">{data.title}</h3>
        <div className="node-meta">
          <time className="node-date">{data.year}</time>
          <div className="node-badges">
            <span className="badge badge-theme">Theme: {data.theme}</span>
          </div>
        </div>
      </header>

      <div className="node-location">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
        <span>{data.location}</span>
      </div>

      <div className="node-description">
        {data.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="node-actions">
        <a href={data.jamLink} target="_blank" rel="noopener noreferrer" className="action-button action-mandatory">
          Jam Submission
          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        
        {data.websiteLink && (
          <a href={data.websiteLink} target="_blank" rel="noopener noreferrer" className="action-button">
            Game Site
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/>
            </svg>
          </a>
        )}
        
        {data.demoLink && (
          <a href={data.demoLink} target="_blank" rel="noopener noreferrer" className="action-button">
            Demo
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </a>
        )}

        {data.sourceLink && (
          <a href={data.sourceLink} target="_blank" rel="noopener noreferrer" className="action-button">
            Source Code
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
          </a>
        )}
      </div>

      <ul className="node-technologies" aria-label="Tecnologias utilizadas">
        {data.technologies.map((tech) => (
          <li key={tech} className="tech-chip">{tech}</li>
        ))}
      </ul>
    </div>
  </article>
));

export const GameJams: React.FC<GameJamsProps> = ({ onClose }) => {
  return (
    <section className="jam-panel">
      <button className="close-button" onClick={onClose} aria-label="Close Game Jams">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="12" />
        </svg>
      </button>

      <h2 className="section-title">Global Game Jams</h2>
      
      <div className="timeline-container">
        {GAMEJAM_DATA.map((record) => (
          <GameJamNode key={record.id} data={record} />
        ))}
      </div>
    </section>
  );
};
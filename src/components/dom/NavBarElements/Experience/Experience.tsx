import React from 'react';
import { EXPERIENCE_DATA, type ExperienceRecord } from '../../../../data/experienceData';
import './Experience.css';

interface ExperienceProps {
  onClose: () => void;
}

const ExperienceNode: React.FC<{ data: ExperienceRecord }> = React.memo(({ data }) => (
  <article className="experience-node">
    <div className="node-marker" />
    <div className="node-content">
      <header className="node-header">
        <div className="node-title-group">
          <h3 className="node-title">{data.title}</h3>
          <span className="node-company">{data.company}</span>
        </div>
        <div className="node-meta">
          <time className="node-date">{data.startDate} — {data.endDate}</time>
          <div className="node-badges">
            <span className="badge badge-type">{data.type}</span>
            <span className="badge badge-mode">{data.mode}</span>
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

      <ul className="node-technologies" aria-label="Tecnologias utilizadas">
        {data.technologies.map((tech) => (
          <li key={tech} className="tech-chip">{tech}</li>
        ))}
      </ul>
    </div>
  </article>
));

export const Experience: React.FC<ExperienceProps> = ({ onClose }) => {
  return (
    <section className="experience-panel">
      <button className="close-button" onClick={onClose} aria-label="Fechar Experiência">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="12" />
        </svg>
      </button>

      <h2 className="section-title">Experience</h2>
      
      <div className="timeline-container">
        {EXPERIENCE_DATA.map((record) => (
          <ExperienceNode key={record.id} data={record} />
        ))}
      </div>
    </section>
  );
};
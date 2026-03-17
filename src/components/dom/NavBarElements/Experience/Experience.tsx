import React from 'react';
import { EXPERIENCE_DATA, type ExperienceRecord } from '../../../../data/experienceData';
import './Experience.css';

/**
 * Props for the Experience panel.
 */
interface ExperienceProps {
  onClose: () => void;
}

/**
 * Renders one timeline node for a professional experience entry.
 */
const ExperienceNode: React.FC<{ data: ExperienceRecord }> = React.memo(({ data }) => (
  <article className="experience-node">
    <div className="node-marker" />
    <div className="node-content">
      <header className="node-header">
        <h3 className="node-title">{data.title}</h3>
        {/* Link removed; reverted to plain text. */}
        <span className="node-company">{data.company}</span>
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

      {/* Expanded conditional rendering: only generates actions when links exist. */}
      {(data.companyLink || data.projectLink || data.demoLink || data.certificateLink) && (
        <div className="node-actions">
          {data.companyLink && (
            <a href={data.companyLink} target="_blank" rel="noopener noreferrer" className="action-button">
              Company Website
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
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
          {data.projectLink && (
            <a href={data.projectLink} target="_blank" rel="noopener noreferrer" className="action-button">
              Project
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          )}
          {data.certificateLink && (
            <a href={data.certificateLink} target="_blank" rel="noopener noreferrer" className="action-button">
              Certificate
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
            </a>
          )}
        </div>
      )}

      <ul className="node-technologies" aria-label="Technologies used">
        {data.technologies.map((tech) => (
          <li key={tech} className="tech-chip">{tech}</li>
        ))}
      </ul>
    </div>
  </article>
));

/**
 * Experience panel with professional timeline entries.
 */
export const Experience: React.FC<ExperienceProps> = ({ onClose }) => {
  return (
    <section className="experience-panel">
      <button className="close-button" onClick={onClose} aria-label="Close Experience">
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
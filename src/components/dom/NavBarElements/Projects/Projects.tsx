import React from 'react';
import { PROJECT_DATA, type ProjectRecord } from '../../../../data/projectData';
import './Projects.css';

/**
 * Props for the Projects panel.
 */
interface ProjectsProps {
  onClose: () => void;
}

/**
 * Renders one project timeline entry.
 */
const ProjectNode: React.FC<{ data: ProjectRecord }> = React.memo(({ data }) => (
  <article className="project-node">
    <div className="node-marker" />
    <div className="node-content">
      <header className="node-header">
        <h3 className="node-title">{data.title}</h3>
        <div className="node-meta">
          {/* Conditional rendering logic for the project date range. */}
          <time className="node-date">
            {data.startYear}{data.endYear && ` — ${data.endYear}`}
          </time>
          <div className="node-badges">
            <span className="badge badge-type">{data.type}</span>
            {data.grade && <span className="badge badge-grade">Grade: {data.grade}</span>}
          </div>
        </div>
      </header>

      <div className="node-description">
        {data.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {(data.websiteLink || data.demoLink || data.sourceLink) && (
        <div className="node-actions">
          {data.websiteLink && (
            <a href={data.websiteLink} target="_blank" rel="noopener noreferrer" className="action-button">
              Website
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
          {data.sourceLink && (
            <a href={data.sourceLink} target="_blank" rel="noopener noreferrer" className="action-button">
              Source Code
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
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
 * Projects panel with portfolio timeline entries.
 */
export const Projects: React.FC<ProjectsProps> = ({ onClose }) => {
  return (
    <section className="project-panel">
      <button className="close-button" onClick={onClose} aria-label="Close Projects">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="12" />
        </svg>
      </button>

      <h2 className="section-title">Projects</h2>
      
      <div className="timeline-container">
        {PROJECT_DATA.map((record) => (
          <ProjectNode key={record.id} data={record} />
        ))}
      </div>
    </section>
  );
};
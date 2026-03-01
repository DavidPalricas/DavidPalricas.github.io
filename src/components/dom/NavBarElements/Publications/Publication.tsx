import React from 'react';
import { PUBLICATION_DATA, type PublicationRecord } from '../../../../data/publicationsData';
import './Publications.css';

interface PublicationsProps {
  onClose: () => void;
}

const PublicationNode: React.FC<{ data: PublicationRecord }> = React.memo(({ data }) => (
  <article className="project-node">
    <div className="node-marker" />
    <div className="node-content">
      <header className="node-header">
        <h3 className="node-title">{data.title}</h3>
        <div className="node-meta">
          <time className="node-date">{data.publishYear}</time>
          <div className="node-badges">
            <span className={`badge status-${data.status.replace(/\s+/g, '-').toLowerCase()}`}>
              {data.status}
            </span>
            {data.award && <span className="badge badge-award">🏆 {data.award}</span>}
          </div>
        </div>
      </header>

      <div className="publication-details">
        <p><strong>Conference:</strong> {data.conference}</p>
        {data.publisher && <p><strong>Publisher:</strong> {data.publisher}</p>}
        <p><strong>Role:</strong> {data.role}</p>
      </div>

      <div className="node-description">
        {data.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <blockquote className="publication-reference">
        {data.reference}
      </blockquote>

     {(data.paperLink || data.awardLink) && (
        <div className="node-actions">
          {data.paperLink && (
            <a href={data.paperLink} target="_blank" rel="noopener noreferrer" className="action-button">
              Read Paper
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
          {data.awardLink && (
            <a href={data.awardLink} target="_blank" rel="noopener noreferrer" className="action-button">
              View Award
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  </article>
));

export const Publications: React.FC<PublicationsProps> = ({ onClose }) => {
  return (
    <section className="project-panel">
      <button className="close-button" onClick={onClose} aria-label="Fechar Publicações">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="12" />
        </svg>
      </button>

      <h2 className="section-title">Publications</h2>
      
      <div className="timeline-container">
        {PUBLICATION_DATA.map((record) => (
          <PublicationNode key={record.id} data={record} />
        ))}
      </div>
    </section>
  );
};
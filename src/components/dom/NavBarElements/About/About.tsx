import React from 'react';
import { EDUCATION_DATA, PROFILE_DATA, type EducationRecord, type LinkRecord } from '../../../../data/aboutData';
import './About.css';

interface AboutProps {
  onClose: () => void;
}

const IconRenderer: React.FC<{ type: LinkRecord['type'] }> = React.memo(({ type }) => {
  const baseProps = { viewBox: "0 0 24 24", width: "16", height: "16", fill: "currentColor" };
  
  switch (type) {
    case 'location':
      return <svg {...baseProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'linkedin':
      return <svg {...baseProps}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
    case 'github':
      return <svg {...baseProps}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
    default:
      return <svg {...baseProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
  }
});

const EducationNode: React.FC<{ data: EducationRecord }> = React.memo(({ data }) => (
  <div className="education-node">
    <div className="node-marker" />
    <div className="node-content">
      <time className="node-year">{data.startYear} — {data.endYear || 'Presente'}</time>
      <div className="node-header">
        <h3 className="node-degree">{data.degree}</h3>
      </div>
      <h4 className="node-course">{data.courseName}</h4>
      <span className="node-institution">{data.institution}</span>
      
      <div className="node-actions">
        <a href={data.institutionLink} target="_blank" rel="noopener noreferrer" className="action-button">
          Institution Website
          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        
        {data.courseLink && (
          <a href={data.courseLink} target="_blank" rel="noopener noreferrer" className="action-button">
            Course
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  </div>
));

export const About: React.FC<AboutProps> = ({ onClose }) => {
  return (
    <section className="about-panel">
      <button className="close-button" onClick={onClose} aria-label="Close About">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="12" />
        </svg>
      </button>

      <div className="profile-section">
        <div className="profile-sidebar">
          <div className="profile-picture">
            <img src="/imgs/profile.jpeg" alt={`Portrait of ${PROFILE_DATA.name}`} loading="eager" />
          </div>
          <div className="links-grid">
            {PROFILE_DATA.links.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="profile-link">
                <IconRenderer type={link.type} />
                <span className="link-label">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="profile-main-content">
          <h2 className="section-title">About</h2>
          <div className="profile-text-block">
            <h1 className="profile-name">{PROFILE_DATA.name}</h1>
            <h3 className="profile-title">{PROFILE_DATA.title}</h3>
            <div className="profile-bio-text">
              {PROFILE_DATA.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="education-section">
        <h2 className="section-title">Education</h2>
        <div className="timeline-container">
          {EDUCATION_DATA.map((record) => (
            <EducationNode key={record.id} data={record} />
          ))}
        </div>
      </div>
    </section>
  );
};
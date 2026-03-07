export type WorkMode = 'OnSite' | 'Hybrid' | 'Remote';
export type WorkType = 'Internship' | 'Apprenticeship' | 'Research Fellowship';

export interface ExperienceRecord {
  id: string;
  title: string;
  company: string;
  companyLink: string;
  location: string;
  mode: WorkMode;
  type: WorkType;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
  projectLink?: string;
  demoLink?: string;
  certificateLink?: string;
}

export const EXPERIENCE_DATA: ExperienceRecord[] = [
    {
        id: 'ieeta-vr',
        title: 'Exploring the Effect of Personalized Virtual Reality Serious Game for Stroke Rehabilitation',
        company: 'IEETA',
        companyLink: 'https://www.ieeta.pt/',
        location: 'Aveiro, Portugal',
        mode: 'Hybrid',
        type: 'Research Fellowship',
        startDate: 'March 2026',
        endDate: 'Present',
        description: [
            'Development of personalized Virtual Reality serious games aimed at the motor and cognitive rehabilitation of post-stroke patients.',
        ],
        demoLink: 'https://youtu.be/qCmjLENJX1o?si=hU0D9kyJ9aJgXwD8', 
        technologies: ['Unity', 'C#', 'Meta SDK', 'Blender', 'Git', 'FMOD Studio'],
    },
    {
        id:'digi-media',
        title: 'Designing 2D serious games for engaging families in ACT-based coping skills',
        company: 'DigiMedia',
        companyLink: 'https://digimedia.pt/',
        location: 'Aveiro, Portugal',
        mode: 'Hybrid',
        type: 'Apprenticeship',
        startDate: 'January 2025',
        endDate: 'July 2025',
        description: [
            'In the fourth edition of Students at DigiMedia.',
            'I developed a gamified platform for the ACT2ParenTeens psychological intervention', 
            'Focusing on creating a relatable and motivating experience for both teens and their parents.'
        ],
        technologies: ['React.js', 'TypeScript', 'Phaser', 'Mongo DB', 'Git', 'Vercel'],
        projectLink: 'https://digimedia.pt/studentsdigimedia-get-to-know-project-n-10/',
        certificateLink: 'https://www.linkedin.com/in/david-palricas/overlay/experience/2566545350/multiple-media-viewer?profileId=ACoAAE37dmoBdY0aNhHsMoGM7oYnQX5-D_giU1E&treasuryMediaId=1753883255827&type=DOCUMENT&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BeO3UJiqGT3K8Ze2ax3SFVg%3D%3D'
    },
    {
        id:'critical-manufacturing',
        title: 'Summer Intern',
        company: 'Critical Manufacturing',
        companyLink: 'https://www.criticalmanufacturing.com/',
        location: 'Maia, Portugal',
        mode: 'Hybrid',
        type: 'Internship',
        startDate: 'July 2024',
        endDate: 'September 2024',
        description: [
            'Developed a Memory Collector Tool which collected memory analysis data from dump files (processes, threads, heap, exceptions)',
            'Both a CLI and a GUI were developed to display this data and generated XML reports, enabling integration into automated Azure Pipelines.'
        ],
        technologies: ['C#', 'Azure DevOps', 'Git']
    }
];
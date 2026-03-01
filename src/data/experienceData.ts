export type WorkMode = 'OnSite' | 'Hybrid' | 'Remote';
export type WorkType = 'Internship' | 'Apprenticeship' | 'Research Fellowship';

export interface ExperienceRecord {
  id: string;
  title: string;
  company: string;
  location: string;
  mode: WorkMode;
  type: WorkType;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
}

export const EXPERIENCE_DATA: ExperienceRecord[] = [
    {
        id: 'ieeta-vr',
        title: 'Student Researcher',
        company: 'IEETA',
        location: 'Aveiro, Portugal',
        mode: 'Hybrid',
        type: 'Research Fellowship',
        startDate: 'March 2026',
        endDate: 'December 2026',
        description: [
            'Development of personalized Virtual Reality serious games aimed at the motor and cognitive rehabilitation of post-stroke patients.',
        ],
        technologies: ['Unity', 'C#', 'Meta SDK', 'Blender', 'Git', 'FMOD Studio']
    },
    {
        id:'digi-media',
        title: 'Designing 2D serious games for engaging families in ACT-based coping skills',
        company: 'DigiMedia',
        location: 'Aveiro, Portugal',
        mode: 'Hybrid',
        type: 'Apprenticeship',
        startDate: 'January 2025',
        endDate: 'July 2025',
        description: [
            'Developed a gamified platform for the ACT2ParenTeens psychological intervention', 
            'Focusing on creating a relatable and motivating experience for both teens and their parents.'
        ],
        technologies: ['React.js', 'TypeScript', 'Phaser', 'Mongo DB', 'Git', 'Vercel']
    },
    {
        id:'critical-manufacturing',
        title: 'Summer Intern',
        company: 'Critical Manufacturing',
        location: 'Maia, Portugal',
        mode: 'Hybrid',
        type: 'Internship',
        startDate: 'July 2024',
        endDate: 'September 2024',
        description: [
            'Developed a Memory Collector Tool which collected memory analysis data from dump files (processes, threads, heap, exceptions)',

            'Both a CLI and a GUI were developed to display this data and generated XML reports, enabling integration into automated Azure Pipelines.'
        ],
        technologies: ['C#', 'Azur DevOps', 'Git']
    }


  
];
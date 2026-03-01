export type ProjectType = 'Academic' | 'Personal' | 'Research' | 'Research & Academic';

export interface ProjectRecord {
  id: string;
  title: string;
  type: ProjectType;
  startYear: number | string;
  endYear?: number | string; // Propriedade estritamente opcional
  description: string[];
  technologies: string[];
  grade?: string;
  websiteLink?: string;
  demoLink?: string;
  sourceLink?: string;
}

export const PROJECT_DATA: ProjectRecord[] = [
  {
    id: 'country-fair-vr',
    title: 'Country Fair VR',
    type: 'Research & Academic',
    startYear: 2025,
    endYear: 'Present', 
    description: [
      'Currently developing a project aimed at post-stroke rehabilitation.',
      'The project, "Country Fair VR", combats therapy monotony through personalized serious games, increasing patient engagement via immersive environments.'
    ],
    technologies: ['Unity', 'C#', 'Meta SDK', 'Blender', 'Git', 'FMOD Studio'],
    demoLink: 'https://youtu.be/qCmjLENJX1o?si=hU0D9kyJ9aJgXwD8'
  },
  {
    id: 'out-of-stock',
    title: 'Out of Stock',
    type: 'Academic',
    startYear: 2025, 
    grade: '18/20',
    description: [
      'Players, while infiltrated in a supermarket, will have to fend for their lives as they send customers away to their uncle\'s supermarket across town', 
    ],
    technologies: ['Unity', 'C#', 'Blender', 'Git', 'FMOD Studio'],
    websiteLink: 'https://davidpalricas.itch.io/out-of-stock',
    demoLink: 'https://youtu.be/IFg24VMOCaQ?si=pRUtPv2TVwSeei32',
    sourceLink: 'https://github.com/DavidPalricas/OutofStock'
  },
  {
    id: 'kitchen-assistant',
    title: 'Kitchen Assistant',
    type: 'Academic',
    startYear: 2023,
    endYear: 2024,
    grade: '18/20',
    description: [
      ' A virtual assistant focused on helping elderly people in their kitchens.', 
      'Its main functions are to provide recipes, manage their pantry, and create their shopping lists.', 
    ],
    technologies: ['Python', 'Rasa', 'JavaScript', 'HTML', 'CSS', 'Flask', 'Git'],
    websiteLink: 'https://pedromigueltorrescarneiro.github.io/KitchenAssistant/',
    demoLink: 'https://www.youtube.com/watch?v=MEo8trJgUg4',
    sourceLink: 'https://github.com/DavidPalricas/KitchenAssistant'
  }
];
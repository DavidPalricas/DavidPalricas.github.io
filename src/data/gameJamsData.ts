export interface GameJamRecord {
  id: string;
  title: string;
  location: string;
  year: number | string;
  theme: string;
  description: string[];
  technologies: string[];
  jamLink: string;      
  demoLink?: string;   
  websiteLink?: string; 
  sourceLink?: string;
}

export const GAMEJAM_DATA: GameJamRecord[] = [
  {
    id: 'global-game-jam-26',
    title: 'L\'Ultime Danse',
    location: 'Aveiro, Portugal',
    year: 2026,
    theme: 'Mask',
    description: [
      'You are a treasure hunter, and every expedition is a gamble between profit and survival, know when to leave',
    ],
    technologies: ['GdScript', 'Godot','Git','Blender', 'Kirita'],
    jamLink: 'https://globalgamejam.org/games/2026/lultime-danse-1',
    websiteLink: 'https://davidpalricas.itch.io/lultime-danse',
    demoLink: '',
    sourceLink: ''
  },
  {
    id: 'global-game-jam-25',
    title: 'Arthur the Duck Slayer',
    location: 'Aveiro, Portugal',
    year: 2025,
    theme: 'Bubbles',
    description: [
      'Arthur and Bubbles is a shooter where Arthur, armed with his bubble weapon "Bubbles," fights the Duck God and its servants.'
    ],
    technologies: ['C#', 'Unity', 'Git', 'Kirita'],
    jamLink: 'https://globalgamejam.org/games/2025/arthur-duck-slayer-2',
    websiteLink: 'https://davidpalricas.itch.io/arthur-the-duck-slayer',
    demoLink: 'https://youtu.be/U3bmQPs53Ic?si=eGQEbz16YfRtlQaK',
    sourceLink: 'https://github.com/DavidPalricas/Arthur-The-Duck-Slayer-GGJ2025'
  },
];
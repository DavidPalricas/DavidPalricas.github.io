export interface SectionData {
  id: string;
  label: string;
  modelName: string;
  position: [number, number, number];
}

export const SECTIONS: SectionData[] = [
  { id: 'about', label: 'About', modelName: 'about', position: [-6, 0, -1] },
  { id: 'experience', label: 'Experience', modelName: 'experience', position: [-2, -2, -12] },
  { id: 'projects', label: 'Projects', modelName: 'projects', position: [1.5, -5, -5] },
  {id: 'game-jams', label: 'Global Game Jams', modelName: 'game-jams', position: [5, -1, -15]},
  {id: 'publications', label: 'Publications', modelName: 'publications', position: [15, -10, -22]},
  { id: 'contact', label: 'Contact Me', modelName: 'contact', position: [6, 1, 0] },

];
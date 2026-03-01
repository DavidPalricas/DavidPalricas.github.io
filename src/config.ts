export interface SectionData {
  id: string;
  label: string;
  modelName: string;
  position: [number, number, number];
}

export const SECTIONS: SectionData[] = [
  { id: 'about', label: 'About', modelName: 'about', position: [-6, 0, 0] },
  { id: 'experience', label: 'Experience', modelName: 'experience', position: [-1, 2, -10] },
  { id: 'projects', label: 'Projects', modelName: 'projects', position: [1.5, -5, -3] },
  {id: 'game-jams', label: 'Global Game Jams', modelName: 'game-jams', position: [4, -1, -5]},
  { id: 'contact', label: 'Contact Me', modelName: 'contact', position: [6, 1, 0] },

];
export interface SectionData {
  id: string;
  label: string;
  modelName: string;
  position: [number, number, number];
}

export const SECTIONS: SectionData[] = [
  { id: 'about', label: 'About', modelName: 'about', position: [-4, 0, 0] },
  { id: 'experience', label: 'Experience', modelName: 'experience', position: [-1.5, 2, -2] },
  { id: 'projects', label: 'Projects', modelName: 'projects', position: [1.5, -1, -3] },
  { id: 'contact', label: 'Contact', modelName: 'contact', position: [4, 1, 0] },
];
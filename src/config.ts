export interface SectionData {
  id: string;
  label: string;
  modelName: string;
  position: [number, number, number];
}

export const SECTIONS: SectionData[] = [
  // Raio = 8.5
  // θ = 30°
  { id: 'about', label: 'About', modelName: 'about', position: [7.36, 1.5, 4.25] },
  
  // θ = 90° (Planeta mais próximo da câmara)
  { id: 'experience', label: 'Experience', modelName: 'experience', position: [0, -0.8, 8.5] },
  
  // θ = 150°
  { id: 'projects', label: 'Projects', modelName: 'projects', position: [-7.36, 2.0, 4.25] },
  
  // θ = 210°
  { id: 'game-jams', label: 'Global Game Jams', modelName: 'game-jams', position: [-7.36, -1.5, -4.25] },
  
  // θ = 270° (Planeta mais afastado)
  { id: 'publications', label: 'Publications', modelName: 'publications', position: [0, 0.8, -8.5] },
  
  // θ = 330°
  { id: 'contact', label: 'Contact Me', modelName: 'contact', position: [7.36, -2.2, -4.25] }
];
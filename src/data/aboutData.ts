export interface LinkRecord {
  label: string;
  url: string;
  type: 'location' | 'linkedin' | 'github' | 'itch' | 'orcid';
}

export interface EducationRecord {
  id: string;
  degree: string;
  institution: string;
  institutionLogo: string;
  startYear: number;
  endYear?: number | 'Presente';
  courseName: string;
  courseLink: string;
}

export const PROFILE_DATA = {
  name: "David Palricas",
  title: "Student Researcher at IEETA and Computer and Informatics Engineer",
  bio: [
    "Highly motivated and collaborative Student Researcher, currently pursuing a Master's in Digital Game Development at the University of Aveiro, and holding a degree in Computer and Informatics Engineering.",
    "I am currently working at IEETA, developing personalized VR serious games for stroke rehabilitation.",
    "Skilled in C#, GDScript, Python, and Java, with experience using game engines such as Unity and Godot. Also experienced in web development (React.js, Three.js, Flask).",
    "Organized and team-oriented, seeking opportunities to apply and expand my expertise in challenging projects within digital game development, virtual and augmented reality."
  ],
  links: [
    { label: "Figueira da Foz, Portugal", url: "https://maps.google.com/?q=Figueira+da+Foz,+Portugal", type: "location" },
    { label: "Linkedin", url: "https://linkedin.com/in/david-palricas", type: "linkedin" },
    { label: "GitHub", url: "https://github.com/DavidPalricas", type: "github" },
    { label: "Itch.io", url: "https://davidpalricas.itch.io/", type: "itch" },
    { label: "ORCID", url: "https://orcid.org/0009-0006-8101-6822", type: "orcid" }
  ] as LinkRecord[]
};

export const EDUCATION_DATA: EducationRecord[] = [
  {
    id: 'msc',
    degree: "Master's Degree",
    institution: 'Universidade de Aveiro',
    institutionLogo: 'imgs/logos/ua.png', 
    startYear: 2024,
    endYear: 2026,
    courseName: 'Digital Game Development',
    courseLink: 'https://www.ua.pt/en/curso/513'
  },
  {
    id: 'bsc',
    degree: "Bachelor's Degree",
    institution: 'Universidade de Aveiro',
    institutionLogo: 'imgs/logos/ua.png',
    startYear: 2021,
    endYear: 2024,
    courseName: 'Computer and Informatics Engineering',
    courseLink: 'https://www.ua.pt/en/curso/486'
  },
  {
    id: 'highschool',
    degree: 'High School Level',
    institution: 'Escola Secundária Dr. Joaquim de Carvalho',
    institutionLogo: 'imgs/logos/esjcff.jpg',
    startYear: 2018,
    endYear: 2021,
    courseName: 'Scientific-Humanistic Course in Science and Technology',
    courseLink: 'https://esjcff.pt/site/index.php'
  }
];
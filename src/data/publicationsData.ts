/**
 * Publication lifecycle status.
 */
export type PublicationStatus = 'Published' | 'Accepted' | 'Under Review';

/**
 * Describes one publication entry shown in the Publications section.
 */
export interface PublicationRecord {
  id: string;
  title: string;
  conference: string;
  publisher?: string;
  status: PublicationStatus;
  role: string;
  publishYear?: number;
  reference: string;
  description: string[];
  award?: string;
  paperLink?: string;
  awardLink?: string;
}

/**
 * Scientific publications and submissions displayed in the portfolio.
 */
export const PUBLICATION_DATA: PublicationRecord[] = [
{
    id:'from-standardization-to-personalization',
    title:'From Standardization to Personalization: Navigating the Dual Demands of Adopting eXtended Reality for Rehabilitation Recovery',
    conference:'XR Salento 2026',
    status:'Under Review',
    role:'Co-Author',
    reference:'B. Marques, M. Chessa, S. Oliveira, M. Pizzo, I. Figueiredo, M. Martini, P. Amorim, S. Silva, D. Palricas, P. Reisinho, C. Ferreira, P. Dias, and B. S. Santos, "From Standardization to Personalization: Navigating the Dual Demands of Adopting eXtended Reality for Rehabilitation Recovery," presented at XR Salento 2026, 2026.',
    description:['This paper, examines the role of Extended Reality (XR) in rehabilitation, focusing on the balance between standardization and personalization.',
        'Based on collaborative research across European universities, it analyzes the maturity of XR solutions and the challenges of integrating personalized interventions into clinical practice through human-centered design']
},

{
    id:'addressing-personalized-vr',
    title:'Addressing Personalized Virtual Reality for Stroke Rehabilitation through a Country Fair Serious Game Approach: A proposal',
    conference:'IEEE VR - XR-MED',
    status:'Accepted',
    role:'Co-Author',
    reference:`I. Figueiredo, D. Palricas, B. Marques, A. R. Guimarães, S.
Oliveira, P. Amorim, S. Silva, P. Dias, and B. S. Santos, "Addressing Personalized
Virtual Reality for Stroke Rehabilitation through a Country Fair Serious Game
Approach: A proposal," in IEEE Conference on Virtual Reality and 3D User Interfaces
(IEEE VR), 2026`,
    description:['This paper proposes a personalized VR framework for stroke rehabilitation built around a \'Country Fair\' serious game.',
        'Using a Human-Centered Design approach, the system features modular therapeutic activities with adjustable parameters, such as difficulty movement range, and cognitive load, enabling clinicians to tailor sessions to each patient.',
        ' A data-driven architecture supports performance monitoring and adaptive progression, addressing the engagement and personalization gaps common in traditional rehabilitation']
},
{
  id: 'leveraging-social-interaction',
  title: 'Leveraging Social Interaction: Stroke Rehabilitation using eXtended Reality',
  conference: 'IEEE Computer Graphics and Applications',
  status: 'Accepted',
  role: 'Co-Author',
  reference: `B. Marques, S. Oliveira, I. Figueiredo, P. Amorim, M. Leite, C. Ferreira, S. Silva, D. Palricas, P. Dias, B. S. Santos, (2026). "Leveraging Social Interaction: Stroke Rehabilitation using eXtended Reality", IEEE Computer Graphics and Applications.`,
  description: [
    'This paper synthesizes the cumulative findings of a longitudinal research line focused on integrating social interaction into stroke rehabilitation.',
    'It charts the technical and clinical evolution from initial single-user Virtual Reality (VR) prototypes to a comprehensive multi-user eXtended Reality (XR) framework.',
    'Grounded in a Human-Centered Design (HCD) methodology, the work validates the shift from isolated therapies to collaborative and competitive dynamics.',
    'The study also evaluates the ecological validity of transitioning between VR and Augmented Reality (AR) and presents the resulting ecosystem tools, REVIVE and ADAPT, engineered to empower healthcare professionals with real-time monitoring and data-driven personalization.'
  ]
},
{
    id: 'exploring-social-dynamics',
    title: 'Exploring Social Dynamics through Multi-User Virtual and Augmented Reality Serious Games for Stroke Rehabilitation',
    conference: 'XREHAB / ISMAR-Adjunct',
    publisher: 'EasyChair',
    status: 'Accepted',
    role: 'Co-Author',
    reference: `S. Oliveira, B. Marques, P. Amorim, I. Figueiredo, B. Guerreiro, D. Palricas, S. Silva, P. Dias, B.S. Santos (2025). “Exploring Social Dynamics through Multi-User Virtual and Augmented Reality Serious Games for Stroke Rehabilitation”. International Workshop on eXtended Reality for Rehabilitation (XREHAB). IEEE International Symposium on Mixed and Augmented Reality Adjunct (ISMAR-Adjunct), ISMAR, 1-4.`,
    description: [
      `The paper explores the development of serious games in extended Reality (XR) for stroke survivors' rehabilitation, emphasizing social interaction through Virtual Reality (VR) and Augmented Reality (AR).`, 
      `The games were developed in collaboration with healthcare professionals, following a Human-Centered Design (HCD) approach, promoting both physical and cognitive recovery while enhancing social interaction.`
    ],
    award: 'Best short paper award',
    awardLink: 'https://www.ua.pt/pt/noticias/16/92887'
  },
  {
    id: 'kitchen-assistant',
    title: 'Kitchen Assistant for Active Ageing at Home',
    conference: 'DSAI 2024',
    publisher: 'ACM',
    status: 'Published',
    role: 'Author',
    publishYear: 2025,
    reference: '[1] P. Carneiro, I. Águia, D. Palricas, A. P. Rocha, A. Teixeira, and N. Almeida, “Kitchen Assistant for Active Ageing at Home,” in Proceedings of the 11th International Conference on Software Development and Technologies for Enhancing Accessibility and Fighting Info-exclusion, Abu Dhabi United Arab Emirates: ACM, Nov. 2024, pp. 193–202. doi: 10.1145/3696593.3696624.',
    description: [
      'This research explores a Virtual Assistant designed to help older adults maintain autonomy in the kitchen, offering step-by-step cooking guidance and pantry management.',
      'Using a user-centered approach, we developed a prototype and tested it with target users.',
      'The proof-of-concept demonstrates the potential to empower aging populations by supporting daily independence.',
    ],
    paperLink: 'https://dl.acm.org/doi/10.1145/3696593.3696624'
  }
];
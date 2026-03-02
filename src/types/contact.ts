export const CharacterAction = {
  IDLE: 'CharacterArmature|Idle_Gun',
  NODDING: 'CharacterArmature|Yes',
  RUNNING: 'CharacterArmature|Run_Gun_Shoot',
  SUCCESS: 'CharacterArmature|Wave', 
  ERROR: 'CharacterArmature|Death' 
} as const;

export type CharacterAction = typeof CharacterAction[keyof typeof CharacterAction];
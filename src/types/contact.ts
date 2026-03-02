export const CharacterAction = {
  IDLE: 'CharacterArmature|Idle',
  NODDING: 'CharacterArmature|Yes',
  RUNNING: 'CharacterArmature|Run',
  SUCCESS: 'CharacterArmature|Wave', 
  ERROR: 'CharacterArmature|Death' 
} as const;

export type CharacterAction = typeof CharacterAction[keyof typeof CharacterAction];
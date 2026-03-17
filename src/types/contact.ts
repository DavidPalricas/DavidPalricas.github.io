/**
 * Canonical animation names exported by the contact character GLB.
 */
export const CharacterAction = {
  IDLE: 'CharacterArmature|Idle_Gun',
  NODDING: 'CharacterArmature|Yes',
  RUNNING: 'CharacterArmature|Run_Gun_Shoot',
  SUCCESS: 'CharacterArmature|Wave', 
  ERROR: 'CharacterArmature|Death' 
} as const;

/**
 * Union type of all available contact character animation states.
 */
export type CharacterAction = typeof CharacterAction[keyof typeof CharacterAction];
export const CharacterAction = {
  IDLE: 'CharacterArmature|Idle',
  NODDING: 'CharacterArmature|Yes',
  RUNNING: 'CharacterArmature|Run',
  SUCCESS: 'CharacterArmature|Wave' // Opcional, mas recomendado para fechar o ciclo
} as const;

export type CharacterAction = typeof CharacterAction[keyof typeof CharacterAction];
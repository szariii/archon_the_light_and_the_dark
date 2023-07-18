export interface Character {
  id: number;
  type: string;
  moves: number;
  typeOfMoves: string;
  HP: number;
  speed: number;
  attackPower: number;
  attackRate: number;
  photo: string;
  side: number;
  shotSpeed?: number;
  horizontalWidthAttack?: number;
  verticalWidthAttack?: number;
  horizontalMinWidth?: number;
  verticalMinWidth?: number;
  positionI?: number;
  positionJ?: number;
}

export interface KeyLoggerShortcut {
  down: string;
  up: string;
  right: string;
  left: string;
  attack: string;
}

export interface Position {
  i: number;
  j: number;
}

export interface Color {
  yellow: string;
  blue: string;
}

export interface OffsetField {
  x: number;
  y: number;
}

export interface KeysInformations {
  key: string;
  clicked: boolean;
}

export interface IntervalInformations {
  name: string;
  id: number;
  movingSide?: string;
}

export interface AudioInformation {
  name: string;
  htmlElement: HTMLAudioElement;
}

export interface FightingCharactersTypes {
  yellow: Character;
  blue: Character;
}

export interface FieldColorInforamtion {
  color: string;
  bonusYellow: number;
  bonusBlue: number;
}

export interface HpFightinfo {
  yellow: number;
  blue: number;
}

export interface PlantsPlaces {
  id: number;
  x: number;
  y: number;
  phase: number;
}

export interface PositionOfDemagePoints {
  x: number;
  y: number;
}

export interface SpellInformation {
  id: number;
  name: string;
  function: Function;
}

export interface CurrentCharacterSpellsInfo {
  index: number;
  spellsArray: Array<SpellInformation>;
  maxValue: number;
}

export interface DeadCharacter {
  index: number;
  character: Character;
}

export interface MoveCounter {
  i: number;
  j: number;
  indexNumber: number;
}

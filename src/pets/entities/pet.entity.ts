import { AnimalType } from '../enums/AnimalType.enum';

export class Pet {
  id: string; // UUID
  name: string;
  age: number;
  type: AnimalType;
  strength: number;
  agility: number;
  armorClass: number;
  maxHealth: number;
}

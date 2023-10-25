import { v4 as uuidv4 } from 'uuid';
import { CreatePetDto } from '../dto/create-pet.dto';
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

  private static readonly DOG_BASE_STATS = {
    strength: 20,
    agility: 10,
    armorClass: 15,
    maxHealth: 15,
  };

  private static readonly CAT_BASE_STATS = {
    strength: 10,
    agility: 30,
    armorClass: 10,
    maxHealth: 10,
  };

  private static getBaseStats(type: AnimalType) {
    switch (type) {
      case AnimalType.Dog:
        return Pet.DOG_BASE_STATS;
      case AnimalType.Cat:
        return Pet.CAT_BASE_STATS;
      default:
        throw new Error(`Unknown animal type ${type}`);
    }
  }

  constructor({ name, age, type }: CreatePetDto) {
    this.id = uuidv4(); // TODO-- consider whether UUID should have it's own type;
    this.name = name;
    this.age = age;
    this.type = type;
    const baseStats = Pet.getBaseStats(type);
    const { strength, agility, armorClass, maxHealth } = baseStats;
    this.strength = strength;
    this.agility = agility;
    this.armorClass = armorClass;
    this.maxHealth = maxHealth;
  }
}

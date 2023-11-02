import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { AnimalType } from './enums/AnimalType.enum';
import { PetNotFoundException } from './exceptions/PetNotFound.exception';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  private pets: Pet[] = [
    new Pet({ name: 'Rex', age: 8, type: AnimalType.Cat }),
    new Pet({ name: 'Woof', age: 2, type: AnimalType.Dog }),
    new Pet({ name: 'Bandit', age: 43, type: AnimalType.Dog }),
    new Pet({ name: 'Lydia', age: 8, type: AnimalType.Cat }),
  ];

  async createTableIfNeeded(): Promise<void> {
    await this.petRepository.query(`CREATE TABLE IF NOT EXISTS pet (
      id uuid PRIMARY KEY,
      name varchar(255) NOT NULL,
      age int NOT NULL,
      type varchar(255) NOT NULL,
      strength int NOT NULL,
      agility int NOT NULL,
      armor_class int NOT NULL,
      max_health int NOT NULL
    );`);
  }

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const newPet = new Pet(createPetDto);
    await this.petRepository.save(newPet);
    return newPet;
  }

  findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id } });
    if (!pet) {
      throw new PetNotFoundException(id);
    }
    return pet;
  }

  update(id: string, updatePetDto: UpdatePetDto): Pet {
    const matchedPet = this.pets.find((pet) => pet.id === id);
    if (!matchedPet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    const updatedPet = {
      ...matchedPet,
      ...updatePetDto,
    };
    // TODO-- this is not performant, but is just temp code until a real db is wired up
    this.pets = this.pets.map((pet) => (pet.id === id ? updatedPet : pet));
    return updatedPet;
  }

  remove(id: string): void {
    // TODO-- acts as a guard to throw an error if pet doesn't exist; to be re-architected when connecting to a real db
    this.findOne(id);
    // TODO-- this is not performant, but is just temp code until a real db is wired up
    this.pets = this.pets.filter((pet) => pet.id !== id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { PetNotFoundException } from './exceptions/PetNotFound.exception';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

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

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { id } });

    if (!pet) {
      throw new PetNotFoundException(id);
    }

    const updatedPet = this.petRepository.merge(pet, updatePetDto);

    return this.petRepository.save(updatedPet);
  }

  remove(id: string): void {
    console.log('removes pet with id', id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  private pets: Pet[] = [
    { id: '1', name: 'Cat', age: 2, breed: 'Bengal' },
    { id: '2', name: 'Dog', age: 3, breed: 'Labrador' },
    { id: '3', name: 'Rabbit', age: 1, breed: 'Angora' },
  ];

  create(createPetDto: CreatePetDto): Pet {
    const id = uuidv4(); // TODO-- consider whether UUID should have it's own type
    const newPet: Pet = {
      id,
      ...createPetDto,
    };
    this.pets.push(newPet);
    return newPet;
  }

  findAll(): Pet[] {
    return this.pets;
  }

  findOne(id: string): Pet {
    const matchedPet = this.pets.find((pet) => pet.id === id);
    if (!matchedPet) {
      throw new NotFoundException(`Pet with id ${id} not found`);
    }
    return matchedPet;
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

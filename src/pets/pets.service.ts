import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { AnimalType } from './enums/AnimalType.enum';

@Injectable()
export class PetsService {
  private pets: Pet[] = [
    new Pet({ name: 'Rex', age: 8, type: AnimalType.Cat }),
    new Pet({ name: 'Woof', age: 2, type: AnimalType.Dog }),
    new Pet({ name: 'Bandit', age: 43, type: AnimalType.Dog }),
    new Pet({ name: 'Lydia', age: 8, type: AnimalType.Cat }),
  ];

  create(createPetDto: CreatePetDto): Pet {
    const newPet = new Pet(createPetDto);
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

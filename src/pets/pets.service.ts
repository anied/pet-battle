import { Injectable } from '@nestjs/common';
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

  create(createPetDto: CreatePetDto) {
    const id = uuidv4(); // TODO-- consider whether UUID should have it's own type
    const newPet: Pet = {
      id,
      ...createPetDto,
    };
    this.pets.push(newPet);
  }

  findAll() {
    return this.pets;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}

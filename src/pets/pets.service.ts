import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  private pets = [
    { id: 1, name: 'Cat', age: 2, breed: 'Bengal' },
    { id: 2, name: 'Dog', age: 3, breed: 'Labrador' },
    { id: 3, name: 'Rabbit', age: 1, breed: 'Angora' },
  ];

  create(createPetDto: CreatePetDto) {
    return 'This action adds a new pet';
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

import { AnimalType } from '../enums/AnimalType.enum';

export class CreatePetDto {
  name: string;
  age: number;
  type: AnimalType;
}

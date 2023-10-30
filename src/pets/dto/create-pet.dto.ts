import { AnimalType } from '../enums/AnimalType.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(AnimalType)
  type: AnimalType;
}

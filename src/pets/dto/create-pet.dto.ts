import { AnimalType } from '../enums/AnimalType.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(AnimalType)
  type: AnimalType;
}

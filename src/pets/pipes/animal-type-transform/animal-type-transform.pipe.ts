import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AnimalType } from 'src/pets/enums/AnimalType.enum';

@Injectable()
export class AnimalTypeTransform implements PipeTransform<string, AnimalType> {
  transform(value: AnimalType): AnimalType {
    console.log('value', JSON.stringify(value));
    const animalType = AnimalType[value];
    if (!animalType) {
      throw new BadRequestException(`Invalid animal type: ${value}`);
    }
    return animalType;
  }
}

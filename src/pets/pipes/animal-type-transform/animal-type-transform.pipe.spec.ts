import { BadRequestException } from '@nestjs/common';
import { AnimalType } from 'src/pets/enums/AnimalType.enum';
import { AnimalTypeTransform } from './animal-type-transform.pipe';

describe('AnimalTypeTransform', () => {
  let pipe: AnimalTypeTransform;

  beforeEach(() => {
    pipe = new AnimalTypeTransform();
  });

  describe('transform', () => {
    it('should transform a valid string to an AnimalType enum', () => {
      const result = pipe.transform('Dog' as AnimalType);
      expect(result).toEqual(AnimalType.Dog);
    });

    it('should throw a BadRequestException for an invalid string', () => {
      expect(() => pipe.transform('invalid' as AnimalType)).toThrow(
        BadRequestException,
      );
    });

    it('should return the same AnimalType enum if given an AnimalType enum', () => {
      const result = pipe.transform('Cat' as AnimalType);
      expect(result).toEqual(AnimalType.Cat);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetNotFoundExceptionFilter } from './filters/pet-not-found-exception-filter/pet-not-found-exception-filter.filter';
import { FindOneParams } from 'src/type-classes/find-one-params';
import { AnimalType } from './enums/AnimalType.enum';

describe('PetsController', () => {
  let controller: PetsController;
  let service: PetsService;
  const dummyUuid = '00000000-0000-0000-0000-000000000000';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [PetsService],
    }).compile();

    controller = module.get<PetsController>(PetsController);
    service = module.get<PetsService>(PetsService);
  });

  describe('create', () => {
    it('should create a pet', async () => {
      const createPetDto: CreatePetDto = {
        name: 'Fluffy',
        age: 2,
        type: AnimalType.Cat,
      };
      const createdPet = { id: 1, ...createPetDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdPet);

      expect(await controller.create(createPetDto)).toBe(createdPet);
    });
  });

  describe('findAll', () => {
    it('should return an array of pets', async () => {
      const pets = [{ id: 1, name: 'Fluffy', age: 2, type: AnimalType.Cat }];
      jest.spyOn(service, 'findAll').mockResolvedValue(pets);

      expect(await controller.findAll()).toBe(pets);
    });
  });

  describe('findOne', () => {
    it('should return a pet by id', async () => {
      const pet = { id: 1, name: 'Fluffy', age: 2, type: AnimalType.Cat };
      jest.spyOn(service, 'findOne').mockResolvedValue(pet);

      const params: FindOneParams = { id: '1' };
      expect(await controller.findOne(params)).toBe(pet);
    });

    it('should throw a PetNotFoundException if pet is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const params: FindOneParams = { id: '1' };
      await expect(controller.findOne(params)).rejects.toThrow(
        PetNotFoundExceptionFilter,
      );
    });
  });

  describe('update', () => {
    it('should update a pet by id', async () => {
      const updatePetDto: UpdatePetDto = { name: 'Fluffy', age: 3 };
      const updatedPet = { id: 1, ...updatePetDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedPet);

      const params: FindOneParams = { id: '1' };
      expect(await controller.update(params, updatePetDto)).toBe(updatedPet);
    });

    it('should throw a PetNotFoundException if pet is not found', async () => {
      const updatePetDto: UpdatePetDto = { name: 'Fluffy', age: 3 };
      jest.spyOn(service, 'update').mockResolvedValue(null);

      const params: FindOneParams = { id: '1' };
      await expect(controller.update(params, updatePetDto)).rejects.toThrow(
        PetNotFoundExceptionFilter,
      );
    });
  });

  describe('remove', () => {
    it('should remove a pet by id', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(null);

      const params: FindOneParams = { id: '1' };
      expect(await controller.remove(params)).toBe(null);
    });

    it('should throw a PetNotFoundException if pet is not found', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(null);

      const params: FindOneParams = { id: '1' };
      await expect(controller.remove(params)).rejects.toThrow(
        PetNotFoundExceptionFilter,
      );
    });
  });
});

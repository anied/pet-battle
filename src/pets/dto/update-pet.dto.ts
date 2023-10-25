import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Pet } from '../entities/pet.entity';

export class UpdatePetDto extends PartialType(OmitType(Pet, ['id'] as const)) {}

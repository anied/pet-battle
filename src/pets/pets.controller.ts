import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetNotFoundExceptionFilter } from './filters/pet-not-found-exception-filter/pet-not-found-exception-filter.filter';
import { FindOneParams } from 'src/type-classes/find-one-params';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  @UseFilters(PetNotFoundExceptionFilter)
  findOne(@Param() { id }: FindOneParams) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(PetNotFoundExceptionFilter)
  update(@Param() { id }: FindOneParams, @Body() updatePetDto: UpdatePetDto) {
    // Full Pet entity properties not exposed because they would be protected in the full implementation, and only
    // allowed to be updated through specific API endpoints that checked the entity state to verify the update was
    // valid.
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}

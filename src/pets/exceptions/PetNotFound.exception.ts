import { HttpException, HttpStatus } from '@nestjs/common';

export class PetNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Pet with id of ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

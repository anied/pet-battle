import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { PetNotFoundException } from '../../exceptions/PetNotFound.exception';

@Catch(PetNotFoundException)
export class PetNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: PetNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Pet not found',
    });
  }
}

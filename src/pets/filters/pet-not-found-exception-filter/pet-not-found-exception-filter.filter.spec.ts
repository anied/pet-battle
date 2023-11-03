import { Test, TestingModule } from '@nestjs/testing';
import { PetNotFoundExceptionFilter } from './pet-not-found-exception-filter.filter';
import { PetNotFoundException } from '../../exceptions/PetNotFound.exception';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

describe('PetNotFoundExceptionFilter', () => {
  let filter: PetNotFoundExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetNotFoundExceptionFilter],
    }).compile();

    filter = module.get<PetNotFoundExceptionFilter>(PetNotFoundExceptionFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should catch PetNotFoundException and return a 404 status', () => {
    const exception = new PetNotFoundException('123');
    const host = {
      switchToHttp: () => ({
        getRequest: () => null,
        getResponse: () => ({
          status: (code: number) => ({
            json: (data: any) => ({ code, data }),
          }),
        }),
      }),
    };
    const result = filter.catch(exception, host as ArgumentsHost);
    expect(result).toEqual({
      code: 404,
      data: {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Pet with ID 123 not found',
        error: 'Not Found',
      },
    });
  });

  it('should not catch other exceptions', () => {
    const exception = new HttpException('Test', HttpStatus.BAD_REQUEST);
    const host = {
      switchToHttp: () => ({
        getRequest: () => null,
        getResponse: () => ({
          status: (code: number) => ({
            json: (data: any) => ({ code, data }),
          }),
        }),
      }),
    };
    const result = filter.catch(exception, host as ArgumentsHost);
    expect(result).toBeUndefined();
  });
});

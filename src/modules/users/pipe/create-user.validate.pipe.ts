/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';

export class CreateUserValidationPipe implements PipeTransform {
  transform(value: CreateUserDTO, metadata: ArgumentMetadata) {
    if (!value.name || !value.email || !value.username || !value.password) {
      throw new HttpException('Invalid data', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return value;
  }
}

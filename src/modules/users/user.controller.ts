import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';

@Controller(`/users`)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);
    return CreateUserResponseSchemaDTO.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.sub);
  }
}

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { IUserRepository } from './repositories/user.repository';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    { provide: IUserRepository, useClass: UserPrismaRepository },
  ],
})
export class UserModule {}

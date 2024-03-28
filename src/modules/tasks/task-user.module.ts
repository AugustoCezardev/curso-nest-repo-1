import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { TaskUserPrismaRepository } from './repositories/prisma/task-user.prima.respository';
import { ITaskUserRepository } from './repositories/task-user.repository';
import { TaskUserController } from './task-user.controller';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';

@Module({
  imports: [],
  controllers: [TaskUserController],
  providers: [
    PrismaService,
    CreateTaskUserUseCase,
    { provide: ITaskUserRepository, useClass: TaskUserPrismaRepository },
  ],
  exports: [],
})
export class TaskUserModule {}

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { CreateTaskUserSchemaDTO } from './schemas/task-user.schema';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';

@Controller('/tasks')
export class TaskUserController {
  constructor(private taskUserUsecase: CreateTaskUserUseCase) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateTaskUserSchemaDTO, @Request() req: any) {
    return await this.taskUserUsecase.execute({
      ...data,
      userId: req.user.sub,
    });
  }
}

import { PrismaService } from 'src/infra/database/prisma.service';
import {
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../../dto/task-user.dto';
import { ITaskUserRepository } from '../task-user.repository';

export class TaskUserPrismaRepository extends ITaskUserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
    return await this.prisma.taskUser.create({
      data: {
        task: {
          create: {
            title: data.title,
            description: data.description,
            startAt: data.startAt,
            endAt: data.endAt,
            priority: data.priority,
            status: data.status,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }
}

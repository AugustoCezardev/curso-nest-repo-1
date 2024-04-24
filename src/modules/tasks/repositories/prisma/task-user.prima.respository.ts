import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { endOfDay, startOfDay } from 'src/infra/utils/date';
import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../../dto/task-user.dto';
import { ITaskUserRepository } from '../task-user.repository';

@Injectable()
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

  async findAllStartDay(): Promise<TaskUserNotificationDTO[] | null> {
    return await this.prisma.taskUser.findMany({
      where: {
        AND: {
          task: {
            startAt: {
              gte: startOfDay(new Date()),
              lte: endOfDay(new Date()),
            },
          },
        },
      },
      include: {
        task: {
          select: {
            id: true,
            title: true,
            description: true,
            startAt: true,
            endAt: true,
            priority: true,
            status: true,
          },
        },
        user: true,
      },
    });
  }
}

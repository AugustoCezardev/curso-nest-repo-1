import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskUserPrismaRepository } from 'src/modules/tasks/repositories/prisma/task-user.prima.respository';
import { ITaskUserRepository } from 'src/modules/tasks/repositories/task-user.repository';
import { NotificationTaskUserSchedule } from './notification-task-user.schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'gp_app_task_manager',
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    NotificationTaskUserSchedule,
    { provide: ITaskUserRepository, useClass: TaskUserPrismaRepository },
  ],
})
export class ScheduleTaskModule {}

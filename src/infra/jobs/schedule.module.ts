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
        transport: Transport.TCP,
        options: { port: 3002, host: '127.0.0.1' },
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

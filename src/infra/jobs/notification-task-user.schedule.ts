import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ITaskUserRepository } from 'src/modules/tasks/repositories/task-user.repository';

type MessageDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskRepository: ITaskUserRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async getAllTaskDay() {
    const allTasks = await this.taskRepository.findAllStartDay();

    if (!allTasks) return;

    allTasks.forEach(task => {
      const message: MessageDTO = {
        email: task.user.email,
        startAt: task.task.startAt,
        endAt: task.task.endAt,
        name: task.user.name,
        title: task.task.title,
        description: task.task.description,
      };
      this.notificationClient.emit('task-notification', message);
    });

    console.log('Notificando');
  }
}

import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/notification')
export class NotificationController {
  constructor(
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}

  @Get('send-notification')
  testMSNotification() {
    this.notificationClient.emit('task-notification', {
      message: 'Hello from Notification Module',
    });
    return 'Notification sent';
  }
}

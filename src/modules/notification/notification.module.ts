import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
        options: { port: 3002, host: '127.0.0.1' },
      },
    ]),
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserPrismaRepository } from '../users/repositories/prisma/user.prisma.repository';
import { IUserRepository } from '../users/repositories/user.repository';
import { LoginController } from './login.controller';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Module({
  controllers: [LoginController],
  providers: [
    PrismaService,
    SignInUseCase,
    { provide: IUserRepository, useClass: UserPrismaRepository },
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'NESTJS_SUPER_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [],
})
export class LoginModule {}

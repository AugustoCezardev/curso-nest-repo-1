import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { LoginController } from './login.controller';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Module({
  controllers: [LoginController],
  providers: [PrismaService, SignInUseCase],
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

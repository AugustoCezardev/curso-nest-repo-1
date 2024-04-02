import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { SupabaseStorageProvider } from 'src/infra/providers/storage/supabase-storage';
import { IStorage } from '../../infra/providers/storage/storage';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { IUserRepository } from './repositories/user.repository';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';
import { UploadAvatarUserUseCase } from './useCases/upload-avatar-user.usecase';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ProfileUserUseCase,
    UploadAvatarUserUseCase,
    PrismaService,
    { provide: IUserRepository, useClass: UserPrismaRepository },
    { provide: IStorage, useClass: SupabaseStorageProvider },
  ],
})
export class UserModule {}

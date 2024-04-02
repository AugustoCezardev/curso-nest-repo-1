import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { IStorage } from '../../../infra/providers/storage/storage';
import { IUserRepository } from '../repositories/user.repository';
import { CreateUserSchemaDTO } from '../schemas/create-user.schema';
import { CreateUserUseCase } from '../useCases/create-user.usecase';
import { ProfileUserUseCase } from '../useCases/profile-user.usecase';
import { UploadAvatarUserUseCase } from '../useCases/upload-avatar-user.usecase';
import { UserController } from '../user.controller';

describe('UserController', () => {
  let controller: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        ProfileUserUseCase,
        UploadAvatarUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByUserNameOrEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: IStorage,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('should be able to create a new user', async () => {
    const data: CreateUserSchemaDTO = {
      name: 'John Doe',
      email: 'teste@test.com',
      password: '123456',
      username: 'johndoe',
    };

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      id: randomUUID(),
      createdAt: new Date(),
      ...data,
    });

    const result = await controller.create(data);

    expect(result).toHaveProperty('username');
  });
});

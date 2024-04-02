import { Test } from '@nestjs/testing';
import { CreateUserDTO } from '../../dto/user.dto';
import { UserInMemoryRepository } from '../../repositories/in-memory/user-in-memory.repository';
import { IUserRepository } from '../../repositories/user.repository';
import { CreateUserUseCase } from '../create-user.usecase';

let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('Should be able to create a new user', async () => {
    const data: CreateUserDTO = {
      name: 'John Doe',
      email: 'teste@test.com',
      password: '123456',
      username: 'johndoe',
    };

    const result = await createUserUseCase.execute(data);

    expect(result).toHaveProperty('id');
  });

  it('Should not be able to create a new user with the same email', async () => {
    const data: CreateUserDTO = {
      name: 'John Doe',
      email: 'teste_exists@test.com',
      password: '123456',
      username: 'johndoe_exists',
    };

    await createUserUseCase.execute(data);
    expect(createUserUseCase.execute(data)).rejects.toThrow();
  });
});

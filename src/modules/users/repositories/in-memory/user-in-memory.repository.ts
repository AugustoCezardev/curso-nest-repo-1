import { randomUUID } from 'crypto';
import {
  CreateUserDTO,
  UserCreatedDTO,
  UsernameAndEmailDTO,
} from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';

export class UserInMemoryRepository extends IUserRepository {
  private users: UserCreatedDTO[] = [];

  async findByUserNameOrEmail(
    data: UsernameAndEmailDTO,
  ): Promise<UserCreatedDTO | null> {
    const user = this.users.find(
      user => user.username === data.username || user.email === data.email,
    );
    return user || null;
  }

  async save(data: CreateUserDTO): Promise<UserCreatedDTO | null> {
    const user: UserCreatedDTO = {
      id: randomUUID(),
      createdAt: new Date(),
      ...data,
    };
    this.users.push(user);
    return user;
  }

  async findByUsername(username: string): Promise<UserCreatedDTO | null> {
    const user = this.users.find(user => user.username === username);
    return user || null;
  }

  async findById(id: string): Promise<UserCreatedDTO | null> {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }

  async uploadAvatar(id: string, path: string): Promise<void> {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.avatarUrl = path;
    }
  }
}

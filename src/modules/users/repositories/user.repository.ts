import {
  CreateUserDTO,
  UserCreatedDTO,
  UsernameAndEmailDTO,
} from '../dto/user.dto';

export abstract class IUserRepository {
  abstract findByUserNameOrEmail(
    data: UsernameAndEmailDTO,
  ): Promise<UserCreatedDTO | null>;
  abstract save(data: CreateUserDTO): Promise<UserCreatedDTO | null>;
  abstract findByUsername(username: string): Promise<UserCreatedDTO | null>;
}

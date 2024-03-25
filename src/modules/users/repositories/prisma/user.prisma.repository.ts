import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import {
  CreateUserDTO,
  UserCreatedDTO,
  UsernameAndEmailDTO,
} from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserNameOrEmail(
    data: UsernameAndEmailDTO,
  ): Promise<UserCreatedDTO> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
          {
            email: data.email,
          },
        ],
      },
    });
  }

  async save(data: CreateUserDTO): Promise<UserCreatedDTO> {
    return await this.prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  async findByUsername(username: string): Promise<UserCreatedDTO> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    return user;
  }
}

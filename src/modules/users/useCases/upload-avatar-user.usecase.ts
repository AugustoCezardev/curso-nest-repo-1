import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { IStorage } from '../../../infra/providers/storage/storage';
import { AvatarDTO } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class UploadAvatarUserUseCase {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: AvatarDTO) {
    const extFile = extname(data.file.originalname);
    const transformName = `${data.idUser}${extFile}`;
    data.file.originalname = transformName;
    const file = await this.storage.upload(data.file, 'avatar');

    await this.userRepository.uploadAvatar(data.idUser, file.data.path);
    return file;
  }
}

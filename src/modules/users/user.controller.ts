import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { AuthGuard } from '../../infra/providers/auth-guard.provider';
import { FileDTO } from './dto/user.dto';
import {
  CreateUserResponseSchemaDTO,
  CreateUserSchema,
  CreateUserSchemaDTO,
} from './schemas/create-user.schema';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';
import { UploadAvatarUserUseCase } from './useCases/upload-avatar-user.usecase';

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema);

@ApiTags('Users')
@Controller(`/users`)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
  ) {}

  @Post()
  @ApiBody({
    description: 'Create a new user',
    schema: schemaUserSwagger,
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'User already exists',
  })
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);
    return CreateUserResponseSchemaDTO.parse(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async profile(@Request() req) {
    return this.profileUserUseCase.execute(req.user.sub);
  }

  @Put('/upload-avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
    const result = await this.uploadAvatarUserUseCase.execute({
      file,
      idUser: req.user.sub,
    });
    return result;
  }
}

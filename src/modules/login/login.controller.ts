import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInUseCase } from './useCases/sign-in.usecase';

@Controller()
export class LoginController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('login')
  async signIn(@Body() data: SignInDTO) {
    const token = await this.signInUseCase.execute(data);
    return token;
  }
}

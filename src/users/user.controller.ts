import { Controller, Get, Param, Query } from '@nestjs/common';

type ParamsUser = {
  id: string;
};

@Controller()
export class UserController {
  @Get('/user/:id')
  findById(@Param() params: ParamsUser) {
    return 'Usuário do ID: ' + params.id;
  }

  @Get('/users/findByPages')
  findByPages(@Query() queries: string) {
    return 'Queries: ' + JSON.stringify(queries);
  }
}

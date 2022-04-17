import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Controller()
export class AuthController {
  @Get()
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'hello';
  }
}

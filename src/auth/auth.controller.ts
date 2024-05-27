import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return this.authService.generateJwtToken();
  }
}

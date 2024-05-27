import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken() {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const exp = Date.now() + 1000 * 60 * 40;

    const token = this.jwtService.sign({
      id: randomId,
      email: faker.internet.email(),
    });

    return {
      success: true,
      tokenValue: {
        token,
        exp,
      },
    };
  }
}

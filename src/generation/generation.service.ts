import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { generateUser } from '../common/generators/user-generator';

@Injectable()
export class GenerationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(obj: any) {
    for (let i = 0; i < obj.needUsers; i++) {
      const generatedUser = await generateUser();
      await this.userRepository.save(generatedUser);
    }

    return {
      success: true,
      message: 'New user successfully registered',
    };
  }
}

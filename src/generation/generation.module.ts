import { Module } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { GenerationController } from './generation.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Position } from '../positions/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Position])],
  controllers: [GenerationController],
  providers: [GenerationService, UserService],
})
export class GenerationModule {}

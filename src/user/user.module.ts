import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PositionsModule } from '../positions/positions.module';
import { PositionsService } from '../positions/positions.service';
import { Position } from '../positions/entities/position.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    PositionsModule,
    NestjsFormDataModule,
    TypeOrmModule.forFeature([User, Position]),
  ],
  controllers: [UserController],
  providers: [UserService, PositionsService],
  exports: [UserService],
})
export class UserModule {}

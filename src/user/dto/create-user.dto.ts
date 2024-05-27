import { IsOptional } from 'class-validator';
import { Position } from '../../positions/entities/position.entity';

export class CreateUserDto {
  name: string;

  email: string;

  phone: string;

  position_id: number;

  @IsOptional()
  position?: Position;
}

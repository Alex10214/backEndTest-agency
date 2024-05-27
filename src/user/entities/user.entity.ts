import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  position_id: number;

  @Column()
  photo: string;

  @ManyToOne(() => Position, (position) => position.name)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @Column()
  registration_timestamp: number;
}

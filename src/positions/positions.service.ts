import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    const existPosition = await this.positionRepository.findOne({
      where: { name: createPositionDto.name },
    });

    if (existPosition)
      throw new BadRequestException({
        success: false,
        message: 'Position with this name already exist',
      });

    const createdPosition =
      await this.positionRepository.save(createPositionDto);

    return {
      success: true,
      position_id: createdPosition.id,
      message: 'New position successfully registered',
    };
  }

  async findAll() {
    const positionData = await this.positionRepository.find();

    if (!positionData.length) {
    }
    return {
      success: true,
      positionData: positionData,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  NotFoundException,
  ExistExceptions,
  BadRequestException,
} from '../common/exeptions/exceptions';
import { customDate } from '../common/helpers/helpers-functions';
import { compressAndEncodeImageBinary } from '../common/generators/photo-cropping-generator';
import { Position } from '../positions/entities/position.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}
  async create(createUserDto: any) {
    const position = await this.positionRepository.findOne({
      where: { id: createUserDto.position_id },
    });
    if (!position) {
      throw new ExistExceptions('Position with this id does not exist');
    }

    const existUser = await this.userRepository.findOne({
      where: { name: createUserDto.name, phone: createUserDto.phone },
    });

    if (existUser)
      throw new ExistExceptions('User with this phone or email already exist');

    const resizePhoto = await compressAndEncodeImageBinary(
      createUserDto.photo,
      createUserDto.name,
    );

    const newUser = {
      ...createUserDto,
      registration_timestamp: customDate(new Date()),
      photo: resizePhoto,
    };

    const createdUser = await this.userRepository.save(newUser);

    return {
      success: true,
      user_id: createdUser.id,
      message: 'New user successfully registered',
    };
  }

  async findAll(pageNumber: number, countNumber: number, baseUrl: string) {
    const [users, totalUsers] = await this.userRepository.findAndCount({
      skip: (pageNumber - 1) * countNumber,
      take: countNumber,
      relations: ['position'],
    });
    const formattedUsers = users.map((user) => ({
      ...user,
      position: user.position.name,
    }));

    const totalPages = Math.ceil(totalUsers / countNumber);

    const nextUrl =
      pageNumber * countNumber < totalUsers
        ? `${baseUrl}?page=${pageNumber + 1}&count=${countNumber}`
        : null;
    const prevUrl =
      pageNumber > 1
        ? `${baseUrl}?page=${pageNumber - 1}&count=${countNumber}`
        : null;

    if (totalUsers === 0) {
      return {
        success: true,
        pageNumber,
        totalUsers,
        totalPages,
        countNumber,
        links: {
          nextUrl,
          prevUrl,
        },
        users: formattedUsers,
      };
    }

    if (pageNumber > totalPages) {
      throw new NotFoundException('Page not found');
    }

    return {
      success: true,
      pageNumber,
      totalUsers,
      totalPages,
      countNumber,
      links: {
        nextUrl,
        prevUrl,
      },
      users: formattedUsers,
    };
  }

  async findOne(id: number | string) {
    if (typeof id === 'string' || Number.isNaN(id)) {
      throw new BadRequestException('The user must be an integer.');
    }
    const existUser = await this.userRepository.findOne({
      where: { id },
      relations: ['position'],
    });

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    return {
      success: true,
      existUser: { ...existUser, position: existUser.position.name },
    };
  }
}

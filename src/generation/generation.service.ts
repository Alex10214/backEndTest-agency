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

// async findAll(pageNumber: number, countNumber: number, baseUrl: string) {
//   const [users, totalUsers] = await this.userRepository.findAndCount({
//     skip: (pageNumber - 1) * countNumber,
//     take: countNumber,
//     relations: ['position'],
//   });
//
//   console.log('users', users);
//
//   const formattedUsers = users.map((user) => ({
//     ...user,
//     position: user.position.name,
//   }));
//
//   const totalPages = Math.ceil(totalUsers / countNumber);
//
//   const nextUrl =
//     pageNumber * countNumber < totalUsers
//       ? `${baseUrl}?page=${pageNumber + 1}&count=${countNumber}`
//       : null;
//   const prevUrl =
//     pageNumber > 1
//       ? `${baseUrl}?page=${pageNumber - 1}&count=${countNumber}`
//       : null;
//
//   if (totalUsers === 0) {
//     return {
//       success: true,
//       pageNumber,
//       totalUsers,
//       totalPages,
//       countNumber,
//       links: {
//         nextUrl,
//         prevUrl,
//       },
//       users: formattedUsers,
//     };
//   }
//
//   if (pageNumber > totalPages) {
//     throw new NotFoundException('Page not found');
//   }
//
//   return {
//     success: true,
//     pageNumber,
//     totalUsers,
//     totalPages,
//     countNumber,
//     links: {
//       nextUrl,
//       prevUrl,
//     },
//     users: formattedUsers,
//   };
// }

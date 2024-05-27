import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PageAndPageDto } from './dto/pageAndPage.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomValidationPipe } from '../common/pipes/custom-validation-pipe';
import { CustomParseFilePipe } from '../common/pipes/сustom-parse-file-pipe';
import { CustomHeaders } from '../common/pipes/CustomDecorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body(CustomValidationPipe)
    createUserDto: CreateUserDto,
    @UploadedFile(
      new CustomParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 5120 }), // 1024 * 5
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const userWithPhoto = {
      ...createUserDto,
      photo: file,
    };
    return this.userService.create(userWithPhoto);
  }

  @Get()
  async findAll(@Query() query: PageAndPageDto) {
    return this.userService.findAll(
      query.page,
      query.count,
      'http://localhost:3000',
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }
}

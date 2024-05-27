import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFileOptions,
} from '@nestjs/common';
import {
  DoesNotExistException,
  FailedValidatorException,
} from '../exeptions/exceptions';

@Injectable()
export class CustomParseFilePipe implements PipeTransform {
  constructor(private options: ParseFileOptions) {}

  async transform(value: any) {
    if (!value) {
      throw new DoesNotExistException('You must add photo');
    }

    if (this.options.validators) {
      for (const validator of this.options.validators) {
        if (
          validator instanceof FileTypeValidator &&
          !validator.isValid(value)
        ) {
          throw new BadRequestException('Invalid file type!!');
        }
        if (
          validator instanceof MaxFileSizeValidator &&
          !validator.isValid(value)
        ) {
          throw new FailedValidatorException([
            {
              photo: 'The photo may not be greater than 5 Mbytes.',
            },
          ]);
        }
      }
    }

    return value;
  }
}

import { PipeTransform } from '@nestjs/common';
import { isEmail, length, matches } from 'class-validator';
import { FailedValidatorException } from '../exeptions/exceptions';

export class CustomValidationPipe implements PipeTransform {
  transform(value: any) {
    const { name, email, phone, position_id } = value;
    const numberBegin = /^(\+380)\d{9}$/;
    const errors = [];

    if (typeof value !== 'object') {
      errors.push({ message: 'body must be a JSON' });
    }

    if (!length(name, 2, 60) || name === 'null') {
      errors.push({ name: 'The name must be at least 2 characters.' });
    }

    if (!isEmail(email)) {
      errors.push({ email: 'The email must be a valid email address.' });
    }

    if (phone && !matches(phone, numberBegin)) {
      errors.push({ phone: 'The number must begin with: +380' });
    }

    if (!phone) {
      errors.push({ phone: 'The phone field is required.' });
    }

    if (
      position_id.trim() === '' ||
      position_id.trim() === '0' ||
      typeof position_id === 'object'
    ) {
      errors.push({ position_id: 'The position id must be an integer.' });
    }

    if (errors.length > 0) {
      throw new FailedValidatorException(errors);
    }

    return value;
  }
}

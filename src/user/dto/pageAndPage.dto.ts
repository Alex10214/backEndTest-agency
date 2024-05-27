import { IsNotEmpty } from 'class-validator';

export class PageAndPageDto {
  @IsNotEmpty({ message: 'The page must be at least 1.' })
  page: number;

  @IsNotEmpty()
  // @IsInt({ message: 'The count must be an integer' })
  count: number;
}

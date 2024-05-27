import { Body, Controller, Post } from '@nestjs/common';
import { GenerationService } from './generation.service';

@Controller('generation')
export class GenerationController {
  constructor(private readonly generationService: GenerationService) {}

  @Post()
  async create(@Body() obj: any) {
    console.log(obj);
    await this.generationService.create(obj);
  }
}

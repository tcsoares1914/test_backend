import { Body, Controller, Post } from '@nestjs/common';
import { CardsService } from '@src/cards/cards.service';
import { StatusDto } from '@src/cards/dto/status.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  /**
   * List all collection items.
   */
  @Post()
  find(@Body() statusDto: StatusDto) {
    return this.cardsService.findByStatus(statusDto);
  }
}

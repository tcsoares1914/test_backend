import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from '@src/cards/cards.controller';
import { CardsService } from '@src/cards/cards.service';
import { Schedule } from '@src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}

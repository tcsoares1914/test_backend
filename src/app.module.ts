import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@src/config/orm/mysql.config';
import apiConfig from '@src/config/api.config';
import { HealthCheckModule } from '@src/health-check/health-check.module';
import { ScheduleModule } from '@src/schedule/schedule.module';
import { CardsModule } from '@src/cards/cards.module';

const importedModules = [HealthCheckModule, ScheduleModule, CardsModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    ...importedModules,
  ],
})
export class AppModule {}

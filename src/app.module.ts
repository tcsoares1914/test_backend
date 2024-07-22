import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import apiConfig from '@src/config/api.config';
import { HealthCheckModule } from '@src/health-check/health-check.module';
import { ScheduleModule } from './schedule/schedule.module';

const importedModules = [HealthCheckModule, ScheduleModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://root:hxxTdgtfiWS44uU4@hogwarts.j2i6j33.mongodb.net/',
    ),
    ...importedModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

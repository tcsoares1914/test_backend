import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiConfig from '@src/config/api.config';
import { HealthCheckModule } from '@src/health-check/health-check.module';

const importedModules = [HealthCheckModule];
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    ...importedModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

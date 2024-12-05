import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import apiConfig from '@src/config/api.config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthCheckModule } from '@src/health-check/health-check.module';
import { ProductsModule } from './products/products.module';

const importedModules = [HealthCheckModule, ProductsModule];
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI, {
      dbName: process.env.DATABASE_NAME,
    }),
    ...importedModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

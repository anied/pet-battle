import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';

const PG_DOMAIN = process.env.PG_DOMAIN;
const PG_PORT = process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : NaN;
const PG_USER = process.env.PG_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const APP_DB_NAME = process.env.APP_DB_NAME;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PG_DOMAIN,
      port: PG_PORT,
      username: PG_USER,
      password: POSTGRES_PASSWORD,
      database: APP_DB_NAME,
      entities: [],
      synchronize: true,
    }),
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

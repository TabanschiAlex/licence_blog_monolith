import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../exceptions/AllExceptionsFilter';
import { UserModule } from './UserModule';
import { AuthModule } from './AuthModule';
import { ArticleModule } from './ArticleModule';
import { ReviewModule } from './ReviewModule';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), UserModule, AuthModule, ArticleModule, ReviewModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ArticleController } from '../controllers/ArticleController';
import { ArticleService } from '../services/ArticleService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/Article';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}

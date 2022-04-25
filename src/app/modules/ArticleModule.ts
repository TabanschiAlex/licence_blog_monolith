import { forwardRef, Module } from '@nestjs/common';
import { ArticleController } from '../controllers/ArticleController';
import { ArticleService } from '../services/ArticleService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../entities/Article';
import { AuthModule } from './AuthModule';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), forwardRef(() => AuthModule)],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}

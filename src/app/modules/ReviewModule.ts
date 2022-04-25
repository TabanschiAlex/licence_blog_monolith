import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../entities/Review';
import { ReviewController } from '../controllers/ReviewController';
import { ReviewService } from '../services/ReviewService';
import { AuthModule } from './AuthModule';
import { Article } from '../entities/Article';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Article]), forwardRef(() => AuthModule)],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}

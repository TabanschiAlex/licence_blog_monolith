import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BasicQueryRequest } from '../requests/BasicQueryRequest';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/Review';
import { CreateReviewRequest } from '../requests/review/CreateReviewRequest';
import { User } from '../entities/User';
import { Article } from '../entities/Article';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
  ) {}

  public async getAll(query: BasicQueryRequest): Promise<Review[]> {
    const skip = query?.page ? (query?.page?.number - 1) * query?.page?.number : 0;
    const take = query?.page?.size ?? 10;

    return await this.reviewRepository.find({ skip, take, loadEagerRelations: true, relations: ['article', 'user'] });
  }

  public async getOne(id: string): Promise<Review> {
    return await this.reviewRepository.findOneOrFail(id, { loadEagerRelations: true, relations: ['article', 'user'] });
  }

  public async store(request: CreateReviewRequest, user: User): Promise<Review> {
    const review = new Review();

    review.text = request.text;
    review.user = user;
    review.article = await this.articleRepository.findOneOrFail(request.article);

    return await this.reviewRepository.save(review);
  }

  public async update(id: string, request: QueryDeepPartialEntity<Review>): Promise<UpdateResult> {
    return await this.reviewRepository.update(id, request);
  }

  public async delete(id: string): Promise<DeleteResult> {
    await this.reviewRepository.findOneOrFail(id);

    return await this.reviewRepository.delete(id);
  }
}

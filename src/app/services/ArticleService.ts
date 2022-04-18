import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Article } from '../entities/Article';
import { BasicQueryRequest } from '../requests/BasicQueryRequest';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CreateArticleRequest } from '../requests/article/CreateArticleRequest';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

  public async getAll(query: BasicQueryRequest): Promise<Article[]> {
    const skip = query.page ? (query.page.number - 1) * query.page.number : 0;
    const take = query.page.size ?? 10;

    return await this.articleRepository.find({ skip, take });
  }

  public async getOne(id: string): Promise<Article> {
    return this.articleRepository.findOneOrFail(id);
  }

  public async store(request: CreateArticleRequest): Promise<Article> {
    return await this.articleRepository.save(request);
  }

  public async update(id: string, request: QueryDeepPartialEntity<Article>): Promise<UpdateResult> {
    return await this.articleRepository.update(id, request);
  }

  public async delete(id: string): Promise<DeleteResult> {
    await this.articleRepository.findOneOrFail(id);

    return await this.articleRepository.delete(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateArticleRequest } from '../requests/article/CreateArticleRequest';
import { ArticleService } from '../services/ArticleService';
import { UpdateArticleRequest } from '../requests/article/UpdateArticleRequest';
import { ArticleResource } from '../resources/article/ArticleResource';

@Controller('posts')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async index(@Query() query): Promise<ArticleResource> {
    return ArticleResource.factory(await this.articleService.getAll(query));
  }

  @Get(':id')
  public async edit(@Param('id') id: string): Promise<ArticleResource> {
    return ArticleResource.withReviews(await this.articleService.getOne(id));
  }

  @Post()
  public async store(@Body() request: CreateArticleRequest): Promise<ArticleResource> {
    return ArticleResource.one(await this.articleService.store(request));
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() request: UpdateArticleRequest): Promise<string> {
    await this.articleService.update(id, request);

    return 'Updated';
  }

  @Delete(':id')
  public async destroy(@Param('id') id: string): Promise<string> {
    await this.articleService.delete(id);

    return 'Deleted';
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleRequest } from '../requests/article/ArticleRequest';
import { ArticleService } from '../services/ArticleService';
import { ArticleResource } from '../resources/article/ArticleResource';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { ArticleDTO } from '../dto/article/ArticleDTO';

@Controller('articles')
@UsePipes(ValidationPipe)
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
  @UseGuards(JwtAuthGuard)
  public async store(@Body(ArticleDTO) request: ArticleRequest, @Req() req): Promise<ArticleResource> {
    return ArticleResource.one(await this.articleService.store(request, req.user));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async update(@Param('id') id: string, @Body(ArticleDTO) request: ArticleRequest): Promise<string> {
    await this.articleService.update(id, request);

    return 'Updated';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async destroy(@Param('id') id: string): Promise<string> {
    await this.articleService.delete(id);

    return 'Deleted';
  }
}

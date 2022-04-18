import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ReviewService } from '../services/ReviewService';
import { CreateReviewRequest } from '../requests/review/CreateReviewRequest';
import { UpdateReviewRequest } from '../requests/review/UpdateReviewRequest';
import { ReviewResource } from '../resources/review/ReviewResource';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  public async index(@Query() query): Promise<ReviewResource> {
    return ReviewResource.factory(await this.reviewService.getAll(query));
  }

  @Get(':id')
  public async edit(@Param('id') id: string) {
    return ReviewResource.one(await this.reviewService.getOne(id));
  }

  @Post()
  public async store(@Body() request: CreateReviewRequest): Promise<ReviewResource> {
    return ReviewResource.one(await this.reviewService.store(request));
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() request: UpdateReviewRequest): Promise<string> {
    await this.reviewService.update(id, request);

    return 'Updated';
  }

  @Delete(':id')
  public async destroy(@Param('id') id: string): Promise<string> {
    await this.reviewService.delete(id);

    return 'Deleted';
  }
}

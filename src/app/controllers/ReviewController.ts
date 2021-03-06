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
import { ReviewService } from '../services/ReviewService';
import { CreateReviewRequest } from '../requests/review/CreateReviewRequest';
import { UpdateReviewRequest } from '../requests/review/UpdateReviewRequest';
import { ReviewResource } from '../resources/review/ReviewResource';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { ReviewDTO } from '../dto/review/ReviewDTO';

@Controller('reviews')
@UsePipes(ValidationPipe)
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
  @UseGuards(JwtAuthGuard)
  public async store(@Body(ReviewDTO) request: CreateReviewRequest, @Req() req): Promise<ReviewResource> {
    return ReviewResource.one(await this.reviewService.store(request, req.user));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async update(@Param('id') id: string, @Body() request: UpdateReviewRequest): Promise<string> {
    await this.reviewService.update(id, request);

    return 'Updated';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async destroy(@Param('id') id: string): Promise<string> {
    await this.reviewService.delete(id);

    return 'Deleted';
  }
}

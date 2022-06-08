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
import { UserRestrict } from '../guards/UserRestrict';

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
  public async update(@Param('id') id: string, @Body() request: UpdateReviewRequest, @Req() req): Promise<string> {
    const scope = UserRestrict.applyScopeWithCriteria(req.user, id);
    await this.reviewService.update(scope.id, request, scope.uuid);

    return 'Updated';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async destroy(@Param('id') id: string, @Req() req): Promise<string> {
    const scope = UserRestrict.applyScopeWithCriteria(req.user, id);
    await this.reviewService.delete(scope.id, scope.uuid);

    return 'Deleted';
  }
}

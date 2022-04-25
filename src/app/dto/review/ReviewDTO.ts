import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateReviewRequest } from '../../requests/review/CreateReviewRequest';

export class ReviewDTO implements PipeTransform {
  transform(review: CreateReviewRequest, metadata: ArgumentMetadata): CreateReviewRequest {
    return {
      text: review.text,
      article: review.article,
    };
  }
}

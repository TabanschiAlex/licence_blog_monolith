import { Review } from '../../entities/Review';
import { UserResource } from '../user/UserResource';

export class ReviewResource {
  public static one(review: Review) {
    return {
      id: review.id,
      text: review.text,
      user: UserResource.one(review.user),
      article_id: review.article?.id,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  public static factory(reviews: Review[]): Record<string, any> {
    return reviews.map((user) => this.one(user));
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Article } from './Article';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn({ unsigned: true, type: 'int' })
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Article, (article) => article.reviews)
  @JoinColumn({ name: 'article_id' })
  article: Article;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Review } from './Review';

@Entity('posts')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @OneToMany(() => Review, (reviews) => reviews.article)
  reviews: Review[];

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}

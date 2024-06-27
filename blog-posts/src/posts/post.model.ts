import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Post extends Model {
  @Column
  content: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column
  authorId: number;

  @BelongsTo(() => User)
  author: User;
}

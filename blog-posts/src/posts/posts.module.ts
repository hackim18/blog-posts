import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './post.model';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Post]), UsersModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}

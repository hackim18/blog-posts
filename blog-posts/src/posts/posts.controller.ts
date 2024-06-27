import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body('content') content: string) {
    if (!content) {
      return { error: 'Content is required' };
    }
    return this.postsService.createPost(content, req.user.id);
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAllPosts();
    if (posts.length === 0) {
      return { message: 'No posts found' };
    }
    return posts;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const post = await this.postsService.findPostById(id);
    if (!post) {
      return { error: 'Post not found' };
    }
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body('content') content: string,
  ) {
    if (!content) {
      return { error: 'Content is required' };
    }
    const post = await this.postsService.findPostById(id);
    if (!post) {
      return { error: 'Post not found' };
    }
    if (post.authorId !== req.user.id) {
      return { error: 'Unauthorized' };
    }
    console.log('🚀 ~ PostsController ~ id, content:', id, content);
    await this.postsService.updatePost(id, content);
    return { message: 'Post updated successfully', post };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    const post = await this.postsService.findPostById(id);
    if (!post) {
      return { error: 'Post not found' };
    }
    if (post.authorId !== req.user.id) {
      return { error: 'Unauthorized' };
    }
    await this.postsService.deletePost(id);
    return { message: 'Post deleted successfully', post };
  }
}

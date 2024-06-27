import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async createPost(content: string, authorId: number): Promise<Post> {
    return this.postModel.create({
      content,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findAllPosts(): Promise<Post[]> {
    return this.postModel.findAll();
  }

  async findPostById(id: number): Promise<Post> {
    return this.postModel.findByPk(id);
  }

  async updatePost(id: number, content: string): Promise<[number, Post[]]> {
    const [affectedCount, affectedRows] = await this.postModel.update(
      { content, updatedAt: new Date() },
      { where: { id }, returning: true },
    );
    return [affectedCount, affectedRows];
  }

  async deletePost(id: number): Promise<number> {
    return this.postModel.destroy({ where: { id } });
  }
}

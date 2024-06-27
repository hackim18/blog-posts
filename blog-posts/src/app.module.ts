import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}

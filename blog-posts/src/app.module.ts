import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

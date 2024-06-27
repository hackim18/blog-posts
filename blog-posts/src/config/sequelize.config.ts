import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysql',
  database: 'blog',
  autoLoadModels: true,
  synchronize: true,
};

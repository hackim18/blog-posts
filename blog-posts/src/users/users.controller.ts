import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!name || !email || !password) {
      return {
        message: 'Please provide name, email and password',
      };
    }
    const user = await this.usersService.findByEmail(email);
    if (user) {
      return {
        message: 'User already exists',
      };
    }
    return this.usersService.createUser(name, email, password);
  }
}

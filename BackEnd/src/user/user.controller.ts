import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.userService.validateUser(
      body.email,
      body.password
    );

    return this.userService.login(user);
  }

  @Post()
  create(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.userService.create(createUserDto);
  }

  @Post('verify_token')
  async verifyToken(@Body() body: { token: string}) {
    return await this.userService.verifyAccessToken(body.token);
  }

}

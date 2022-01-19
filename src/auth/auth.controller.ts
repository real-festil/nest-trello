import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { Public } from '../decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserExistGuard } from '../users/users.guard';
import { RegisterDto } from './auth.dto';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() req) {
    console.log('hello', req);
    return this.authService.login(req.user);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register new user' })
  @Public()
  @UseGuards(UserExistGuard)
  @Post('/register')
  async addUser(@Body() registerDto: RegisterDto) {
    console.log(registerDto, 'registerDto');
    const res = await this.authService.register(registerDto);

    return res;
  }
}

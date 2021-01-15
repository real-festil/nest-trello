import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from '../decorators/public.decorator';
import { LoginDto, RegisterDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register new user' })
  @Public()
  @Post('/register')
  async addUser(@Body() registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const res = await this.authService.addUser(username, email, password);

    return res;
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return this.authService.login({ email, password });
  }
}

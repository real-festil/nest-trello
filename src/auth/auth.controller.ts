import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from '../decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() req) {
    return this.authService.login(req.user);
  }
}

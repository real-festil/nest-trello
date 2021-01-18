import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { UserExistGuard } from 'src/guards/user-exist.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register new user' })
  @Public()
  @UseGuards(UserExistGuard)
  @Post('/register')
  async addUser(@Body() registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const res = await this.userService.addUser(username, email, password);

    return res;
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Get single users' })
  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.userService.getSingleUser(userId);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Update user' })
  @Patch(':id')
  updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { username, email, password } = updateUserDto;
    this.userService.updateUser(userId, username, email, password);
    return null;
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    this.userService.deleteUser(userId);
  }
}

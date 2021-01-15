import { Body, Controller, Get, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

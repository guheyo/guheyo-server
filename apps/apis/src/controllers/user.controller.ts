import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpResponse } from '@lib/response/http.response';
import { SocialAccount, User } from '@prisma/client';
import { IUserService } from '~apis/src/interfaces';
import { GetUserBySocialAccountDto } from '~apis/src/dto/get-user-by-social-account.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) {}

  @ApiOperation({
    summary: 'Retrieve a user by id',
  })
  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<HttpResponse<User>> {
    const data = await this.userService.getUser(userId);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }

  @ApiOperation({
    summary: 'get user by social account',
  })
  @Get()
  async getUserBySocialAccount(
    @Query() query: GetUserBySocialAccountDto,
  ): Promise<HttpResponse<SocialAccount>> {
    const data = await this.userService.getUserBySocialAccount(query);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }

  @ApiOperation({
    summary: 'create user',
  })
  @Post()
  async createUser(@Body() body: User): Promise<HttpResponse<User>> {
    const data = await this.userService.createUser(body);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }

  @ApiOperation({
    summary: 'update user by id',
  })
  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() body: User): Promise<HttpResponse<User>> {
    const data = await this.userService.updateUser(userId, body);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }

  @ApiOperation({
    summary: 'delete user by id',
  })
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<HttpResponse<User>> {
    const data = await this.userService.deleteUser(userId);
    return new HttpResponse(HttpStatus.OK, 'OK', data);
  }
}

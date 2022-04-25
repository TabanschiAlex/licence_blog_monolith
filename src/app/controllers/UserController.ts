import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserRequest } from '../requests/user/CreateUserRequest';
import { UpdateUserRequest } from '../requests/user/UpdateUserRequest';
import { UserResource } from '../resources/user/UserResource';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { UserDTO } from '../dto/user/UserDTO';

@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async index(@Query() query) {
    return UserResource.factory(await this.userService.getAllUsers(query));
  }

  @Get(':uuid')
  public async edit(@Param('uuid') uuid: string) {
    return UserResource.one(await this.userService.getUserByUuid(uuid));
  }

  @Post()
  public async store(@Body(UserDTO) userDto: CreateUserRequest) {
    return UserResource.one(await this.userService.storeUser(userDto));
  }

  @Put(':uuid')
  public async update(@Param('uuid') uuid: string, @Body() userDto: UpdateUserRequest): Promise<string> {
    await this.userService.updateUser(uuid, userDto);

    return 'User updated successfully';
  }

  @Delete(':uuid')
  public async destroy(@Param('uuid') uuid: string): Promise<string> {
    await this.userService.deleteUser(uuid);

    return 'User deleted successfully';
  }

  @Get(':uuid/read')
  public async read(@Param('uuid') uuid: string, @Res() res: Response) {
    return UserResource.one(await this.userService.getUserByUuid(uuid));
  }
}

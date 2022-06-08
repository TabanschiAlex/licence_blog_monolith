import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { CreateUserRequest } from '../requests/user/CreateUserRequest';
import { UpdateUserRequest } from '../requests/user/UpdateUserRequest';
import { UserResource } from '../resources/user/UserResource';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { UserDTO } from '../dto/user/UserDTO';
import { UserRestrict } from '../guards/UserRestrict';

@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async index(@Query() query, @Req() req) {
    UserRestrict.canAccess(req.user.role);
    return UserResource.factory(await this.userService.getAllUsers(query));
  }

  @Get(':uuid')
  public async edit(@Param('uuid') uuid: string, @Req() req) {
    const scope = UserRestrict.applyScope(req.user, uuid);
    return UserResource.one(await this.userService.getUserByUuid(scope));
  }

  @Post()
  public async store(@Body(UserDTO) userDto: CreateUserRequest, @Req() req) {
    UserRestrict.canAccess(req.user.role);
    return UserResource.one(await this.userService.storeUser(userDto));
  }

  @Put(':uuid')
  public async update(@Param('uuid') uuid: string, @Body() userDto: UpdateUserRequest, @Req() req): Promise<string> {
    UserRestrict.canAccess(req.user.role);
    await this.userService.updateUser(uuid, userDto);

    return 'User updated successfully';
  }

  @Patch(':uuid')
  public async updateName(@Param('uuid') uuid: string, @Body('name') name: string, @Req() req) {
    const scope = UserRestrict.applyScope(req.user, uuid);
    await this.userService.updateName(scope, name);

    return 'User updated successfully';
  }

  @Delete(':uuid')
  public async destroy(@Param('uuid') uuid: string, @Req() req): Promise<string> {
    UserRestrict.canAccess(req.user.role);
    await this.userService.deleteUser(uuid);

    return 'User deleted successfully';
  }

  @Get(':uuid/read')
  public async read(@Param('uuid') uuid: string) {
    return UserResource.one(await this.userService.getUserByUuid(uuid));
  }
}

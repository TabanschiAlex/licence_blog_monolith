import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { AuthResource } from '../resources/auth/AuthResource';
import { AuthRegisterRequest } from '../requests/auth/AuthRegisterRequest';
import { AuthLoginRequest } from '../requests/auth/AuthLoginRequest';
import { AuthLoginDTO } from '../dto/auth/AuthLoginDTO';
import { AuthRegisterDTO } from '../dto/auth/AuthRegisterDTO';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body(AuthLoginDTO) request: AuthLoginRequest): Promise<AuthResource> {
    return await this.authService.login(request);
  }

  @Post('register')
  public async register(@Body(AuthRegisterDTO) request: AuthRegisterRequest): Promise<string> {
    return await this.authService.register(request);
  }
}

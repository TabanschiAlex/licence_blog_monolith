import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { AuthRegisterRequest } from '../../requests/auth/AuthRegisterRequest';

export class AuthRegisterDTO implements PipeTransform {
  transform(auth: AuthRegisterRequest, metadata: ArgumentMetadata): AuthRegisterRequest {
    return {
      email: auth.email,
      password: auth.password,
      passwordConfirmation: auth.passwordConfirmation,
    };
  }
}

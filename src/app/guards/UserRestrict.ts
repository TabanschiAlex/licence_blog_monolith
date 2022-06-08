import { ForbiddenException } from '@nestjs/common';
import { Roles } from '../enums/Roles';

export class UserRestrict {
  public static canAccess(role: string): boolean {
    if (role !== Roles.ADMIN) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }

  public static applyScope(user: any, uuid: string): string {
    if (user.role === Roles.ADMIN) {
      return uuid;
    }

    return user.uuid;
  }

  public static applyScopeWithCriteria(user: any, id: string) {
    if (user.role === Roles.ADMIN) {
      return { id: id };
    }

    return { uuid: user.uuid, id: id };
  }
}

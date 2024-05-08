import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/domain/user/user.constants';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);

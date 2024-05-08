import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import IUser from 'src/domain/user/user.entity';
import { Role } from 'src/domain/user/user.constants';
import UserService from 'src/domain/user/user.service';
import IService from 'src/shared/interface/service.interface';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: IService<IUser>,
  ) {}

  @Post()
  @HasRoles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() user: IUser): Promise<IUser> {
    return this.userService.create(user);
  }

  @Get()
  @HasRoles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findAll(): Promise<IUser[]> {
    return this.userService.list();
  }

  @Put(':id')
  @HasRoles(Role.ADMINISTRATOR, Role.CLIENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(@Param('id') id: string, @Body() user: IUser): Promise<IUser> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IUser> {
    return this.userService.delete(id);
  }
}

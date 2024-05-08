import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/decorators/auth.user.decorator';
import { HasRoles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import IPet from 'src/domain/pet/pet.entity';
import PetService from 'src/domain/pet/pet.service';
import IUser from 'src/domain/user/user.entity';
import { Role } from 'src/domain/user/user.constants';
import { RecourseAccessInterceptor } from '../interceptor/resource.access.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('pets')
@ApiBearerAuth()
@ApiTags('Pets')
export default class PetController {
  constructor(@Inject(PetService) private readonly petService: PetService) {}

  @Post()
  @HasRoles(Role.CLIENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() pet: IPet) {
    return await this.petService.create(pet);
  }

  @Get()
  @HasRoles(Role.CLIENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async list(@AuthUser() user: IUser) {
    return await this.petService.listBy({ user: user._id });
  }

  @Put(':id')
  @HasRoles(Role.CLIENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(RecourseAccessInterceptor)
  async update(@Param('id') id: string, @Body() pet: IPet): Promise<IPet> {
    return await this.petService.update(id, pet);
  }

  @Delete(':id')
  @HasRoles(Role.CLIENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(RecourseAccessInterceptor)
  async delete(@Param('id') id: string): Promise<IPet> {    
    return await this.petService.delete(id);
  }
}

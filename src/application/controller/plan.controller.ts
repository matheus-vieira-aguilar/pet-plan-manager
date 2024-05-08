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
import IPlan from 'src/domain/plan/plan.entity';
import PlanService from 'src/domain/plan/plan.service';
import { Role } from 'src/domain/user/user.constants';
import IService from 'src/shared/interface/service.interface';

@Controller('plans')
@ApiBearerAuth()
@ApiTags('Plans')
export default class PlanController {
  constructor(
    @Inject(PlanService) private readonly planService: IService<IPlan>,
  ) {}

  @Post()
  @HasRoles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() plan: IPlan) {
    return await this.planService.create(plan);
  }

  @Get()
  @HasRoles(Role.ADMINISTRATOR, Role.CLIENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async list() {
    return await this.planService.list();
  }

  @Put(':id')
  @HasRoles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(@Param('id') id: string, @Body() plan: IPlan): Promise<IPlan> {
    return await this.planService.update(id, plan);
  }

  @Delete('id')
  @HasRoles(Role.ADMINISTRATOR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async delete(@Param('id') id: string): Promise<IPlan> {
    return await this.planService.delete(id);
  }
}

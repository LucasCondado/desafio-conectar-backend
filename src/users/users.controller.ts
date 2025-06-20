import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  getProfile(@Req() req): Promise<User | null> {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  @Roles('admin')
  create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<User>,
    @Req() req
  ): Promise<User | null> {
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.id === id;

    if (!isAdmin && !isOwner) {
      throw new ForbiddenException('Você não tem permissão para atualizar este usuário.');
    }

    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
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
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';
import * as bcrypt from 'bcryptjs';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('role') role?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: string,
  ) {
    return this.usersService.findAll({ role, sortBy, order });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    console.log('ID do usuário autenticado:', req.user.sub);
    return this.usersService.findById(req.user.sub);
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: any) {
    // Validar se tem senha
    if (!createUserDto.password) {
      throw new BadRequestException('Senha é obrigatória');
    }

    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    try {
      // Se está tentando atualizar sem senha e não é uma edição parcial
      if (!updateUserDto.password && !updateUserDto.id) {
        // Busca o usuário atual para manter a senha existente
        const existingUser = await this.usersService.findOne(id);
        if (existingUser && existingUser.password) {
          updateUserDto.password = existingUser.password;
        } else {
          throw new BadRequestException('Não foi possível atualizar o usuário: senha é necessária');
        }
      }

      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  // No UsersController (apenas para debug, remova depois)
  @Get('/debug/all')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('/debug/force-admin-password')
  async forceAdminPassword() {
    const hash = '$2b$10$b805ki.TmDZz3f3cjpkzq.KMXOuNAtfOL1LmpD7XQDC10boI9Mmim'; // hash testado no Node
    return this.usersService.updateByEmail('Beto@Carreiro.com', { password: hash });
  }
}
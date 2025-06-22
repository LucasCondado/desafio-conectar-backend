import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.sub);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin' && req.user.sub !== id) {
      throw new ForbiddenException('Acesso negado.');
    }
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.role !== 'admin' && req.user.sub !== id) {
      throw new ForbiddenException('Acesso negado.');
    }
    const user = await this.usersService.update(id, updateUserDto, req.user);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin' && req.user.sub !== id) {
      throw new ForbiddenException('Acesso negado.');
    }
    await this.usersService.remove(id, req.user);
    return { message: 'Usuário removido com sucesso' };
  }
}
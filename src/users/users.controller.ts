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
  Query,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService, // <-- Adicionado AuthService aqui
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários com filtros/paginação/ordenação (apenas admin)' })
  @ApiQuery({ name: 'role', required: false, enum: ['admin', 'user'] })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'createdAt'] })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('inactive')
  @ApiOperation({ summary: 'Listar usuários inativos (sem login há 30 dias, apenas admin)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findInactive() {
    return this.usersService.findInactive();
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário (apenas admin)' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return await this.usersService.create(createUserDto);
  }

  @Post('completar-cadastro')
  async completarCadastro(@Body() dados: CreateUserDto, @Res() res) {
    await this.usersService.create(dados);

    // Busque o usuário completo do banco (com id)
    const user = await this.usersService.findByEmail(dados.email);
    console.log('Usuário retornado do banco após cadastro:', user); // <-- Veja o que aparece aqui

    // Gere o token usando o user do banco
    const token = await this.authService.login(user);

    // Retorne o token para o frontend
    return res.json(token);
  }

  @Get('me')
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Request() req) {
    console.log('Chamou /users/me com sub:', req.user.sub); // <-- Adicione esta linha
    return this.usersService.findOne(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário pelo id (admin ou o próprio usuário)' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req: any) {
    if (req.user.role !== 'admin' && req.user.sub !== id) {
      throw new ForbiddenException('Acesso negado.');
    }
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar usuário (admin ou o próprio usuário)' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    if (req.user.role !== 'admin' && req.user.sub !== id) {
      throw new ForbiddenException('Acesso negado.');
    }
    const user = await this.usersService.update(id, updateUserDto, req.user);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário (admin ou o próprio usuário)' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user.role !== 'admin' && req.user.sub !== id) {
      throw new ForbiddenException('Acesso negado.');
    }
    // Retorne o usuário deletado sem o campo password
    return await this.usersService.remove(id, req.user);
  }
}
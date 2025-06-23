import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere, Raw, IsNull } from 'typeorm';
import { User, Role } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import * as bcrypt from 'bcryptjs';

type UserSafe = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Cria usuário novo, garantindo e-mail único e senha hash
  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (exists) throw new ConflictException('E-mail já cadastrado');
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  // Busca paginada, filtrada, ordenada e sem campo password
  async findAll(query: UserQueryDto = {}): Promise<{
    data: UserSafe[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      name,
      email,
      role,
      sortBy = 'createdAt',
      order = 'ASC',
      page = '1',
      limit = '10',
    } = query;

    const where: FindOptionsWhere<User> = {};
    if (name) where.name = Like(`%${name}%`);
    if (email) where.email = Like(`%${email}%`);
    if (role) where.role = role;

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [users, total] = await this.usersRepository.findAndCount({
      where,
      order: {
        [sortBy]: order.toUpperCase() as 'ASC' | 'DESC',
      },
      take,
      skip,
    });

    return {
      data: users.map(({ password, ...rest }) => rest),
      total,
      page: Number(page),
      limit: take,
    };
  }

  // Busca usuários inativos há 30+ dias ou nunca logaram
  async findInactive(): Promise<UserSafe[]> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);

    const users = await this.usersRepository.find({
      where: [
        { lastLoginAt: IsNull() },
        { lastLoginAt: Raw(alias => `${alias} < :cutoff`, { cutoff }) },
      ],
    });
    return users.map(({ password, ...rest }) => rest);
  }

  // Busca usuário por id (safe)
  async findOne(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user || undefined;
  }

  // Busca usuário por e-mail para autenticação (inclui senha)
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user || undefined;
  }

  // Atualiza usuário (apenas se admin ou dono), com hash de senha se mudou
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    reqUser: User,
  ): Promise<UserSafe> {
    if (reqUser.role !== Role.ADMIN && reqUser.id !== id) {
      throw new ForbiddenException('Not allowed');
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      delete updateUserDto.password;
    }
    Object.assign(user, updateUserDto);
    const savedUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  // Remove usuário (apenas admin ou dono)
  async remove(id: string, reqUser: User): Promise<UserSafe | { message: string }> {
    if (reqUser.role !== Role.ADMIN && reqUser.id !== id) {
      throw new ForbiddenException('Not allowed');
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
    // Retorne o usuário sem o campo password (para testes e2e)
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Atualiza o lastLoginAt
  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLoginAt: new Date() });
  }
}
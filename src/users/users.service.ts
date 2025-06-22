import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere, Raw } from 'typeorm';
import { User, Role } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const userExists = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new ConflictException('Email already registered');
    }
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hash,
    });
    const savedUser = await this.usersRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findAll(query: UserQueryDto = {}): Promise<{
    data: Omit<User, 'password'>[];
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
        [sortBy]: order.toUpperCase(),
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

  async findInactive(): Promise<Omit<User, 'password'>[]> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);

    const users = await this.usersRepository.find({
      where: [
        { lastLoginAt: null },
        { lastLoginAt: Raw(alias => `${alias} < :cutoff`, { cutoff }) },
      ],
    });
    return users.map(({ password, ...rest }) => rest);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'role', 'password'],
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    reqUser: User,
  ): Promise<Omit<User, 'password'>> {
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

  async remove(id: string, reqUser: User): Promise<{ message: string }> {
    if (reqUser.role !== Role.ADMIN && reqUser.id !== id) {
      throw new ForbiddenException('Not allowed');
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
    return { message: 'Usuário removido com sucesso' };
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { lastLoginAt: new Date() });
  }
}
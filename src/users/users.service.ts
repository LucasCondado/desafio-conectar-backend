import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(options?: { role?: string; sortBy?: string; order?: string }): Promise<User[]> {
    const where: FindOptionsWhere<User> = {};
    if (options?.role) {
      where.role = options.role;
    }

    const order: any = {};
    if (options?.sortBy) {
      order[options.sortBy] = options.order === 'desc' ? 'DESC' : 'ASC';
    }

    const findOptions: FindManyOptions<User> = {
      where,
      order,
    };

    return this.usersRepository.find(findOptions);
  }

  async findOne(id: string): Promise<User | null> {
    return (await this.usersRepository.findOneBy({ id })) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } }) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    console.log('Buscando usuário por ID:', id);
    return await this.usersRepository.findOneBy({ id }) ?? null;
  }

  async create(user: Partial<User>): Promise<User> {
    console.log('Chamando UsersService.create para:', user.email);
    if (user.password && !user.password.startsWith('$2b$')) {
      user.password = await bcrypt.hash(user.password, 10);
      console.log('Senha hasheada:', user.password);
    }
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    try {
      // Remove senha se for string vazia
      if (data.password === '') {
        delete data.password;
      }

      // Se houver senha, faça o hash antes de salvar se não for hash já pronto. a
      if (data.password && !data.password.startsWith('$2b$')) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      await this.usersRepository.update(id, data);
      return this.findOne(id);
    } catch (error) {
      console.error('Erro no service de usuário:', error);
      throw error;
    }
  }

  async updateByEmail(email: string, data: Partial<User>): Promise<User | null> {
    try {
      // Só faz hash se não for hash já pronto
      if (data.password && !data.password.startsWith('$2b$')) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      await this.usersRepository.update({ email }, data);
      return this.findByEmail(email);
    } catch (error) {
      console.error('Erro no updateByEmail:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

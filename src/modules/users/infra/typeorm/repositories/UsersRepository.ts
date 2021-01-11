import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepositorory: Repository<User>;

  constructor() {
    this.ormRepositorory = getRepository(User)
  }
  
  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepositorory.findOne({ where: { id } })
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepositorory.findOne({ where: { email } })
  }

  public async save(user: ICreateUserDTO): Promise<User> {
    return this.ormRepositorory.save(user)
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepositorory.create(userData)

    await this.save(user)

    return user;
  }
}

export default UsersRepository;

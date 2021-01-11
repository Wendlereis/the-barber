import ICrateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICrateUserDTO): Promise<User>
  save(data: ICrateUserDTO): Promise<User>
}

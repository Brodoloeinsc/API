import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export class ListUserService {
    public async execute(): Promise<User[]> {
        const userRepository = getCustomRepository(UsersRepository);

        const users = await userRepository.find();

        return users;
    }
}

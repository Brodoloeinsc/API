import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError(`Email: ${email}, already exists`);
        }

        const hashedPassword = await hash(password, 8);

        const user = await userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(user);

        return user;
    }
}

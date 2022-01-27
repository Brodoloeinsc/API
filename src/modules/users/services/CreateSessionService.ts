import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError(`Incorrect Email/Password Combination.`, 401);
        }

        const passwordConfirm = await compare(password, user.password);

        if (!passwordConfirm) {
            throw new AppError(`Incorrect Email/Password Combination.`, 401);
        }

        const token = await sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return { user, token };
    }
}

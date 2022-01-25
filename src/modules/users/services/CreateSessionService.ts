import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

        const token = await sign(
            {},
            '7ef84f495011a4e024fb1cd0d9e6c6eb69d1bc92',
            {
                subject: user.id,
                expiresIn: '1d'
            }
        );

        return { user, token };
    }
}

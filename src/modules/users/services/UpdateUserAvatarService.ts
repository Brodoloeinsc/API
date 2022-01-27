import { AppError } from '@shared/errors/AppError';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import path from 'path';
import UploadConfig from '@config/upload';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

export class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                UploadConfig.directory,
                user.avatar
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await userRepository.save(user);

        return user;
    }
}

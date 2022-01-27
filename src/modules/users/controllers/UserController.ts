import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import { DeleteUserService } from '../services/DeleteUserService';
import { ListUserService } from '../services/ListUserService';

export class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUsers = new ListUserService();

        console.log(req.user.id);

        const users = await listUsers.execute();

        return res.json(users);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        return res.json(user);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { email } = req.params;
        const deleteUser = new DeleteUserService();

        await deleteUser.execute({ email });

        return res.json([]);
    }
}

import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';
import Product from '../typeorm/entities/Product';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService {
    public async execute({
        name,
        price,
        quantity
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError(`Product ${name} already exists`);
        }

        const product = await productsRepository.create({
            name: name,
            price: price,
            quantity: quantity
        });

        await productsRepository.save(product);

        return product;
    }
}

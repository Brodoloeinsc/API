import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const oneProduct = this.findOne({
            where: {
                name: name
            }
        });

        return oneProduct;
    }
}

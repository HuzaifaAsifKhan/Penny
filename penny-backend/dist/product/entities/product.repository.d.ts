import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductFilterDto } from '../dto/get-product-filter.dto';
import { Product } from './product.entity';
export declare class ProductRepository extends Repository<Product> {
    private dataSource;
    constructor(dataSource: DataSource);
    getProducts(filterDto: GetProductFilterDto, user: User): Promise<Product[]>;
    createProduct(createProductDto: CreateProductDto, user: User): Promise<Product>;
}

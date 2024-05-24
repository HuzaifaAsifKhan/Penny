import { ProductRepository } from './entities/product.repository';
import { User } from '../auth/entities/user.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: ProductRepository);
    getProducts(filterDto: GetProductFilterDto, user: User): Promise<Product[]>;
    deleteProduct(id: number, user: User): Promise<any>;
    createProduct(createProductDTo: CreateProductDto, user: User): Promise<Product>;
}

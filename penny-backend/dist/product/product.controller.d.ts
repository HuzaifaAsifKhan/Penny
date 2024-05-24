import { ProductService } from './product.service';
import { User } from '../auth/entities/user.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(filterDto: GetProductFilterDto, user: User): Promise<Product[]>;
    createProduct(createProductDto: CreateProductDto, user: User): Promise<Product>;
    deleteProduct(id: number, user: User): Promise<any>;
}

import { User } from '../../auth/entities/user.entity';
import { BaseEntity } from 'typeorm';
import { ProductStatus } from '../dto/product-model';
export declare class Product extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: ProductStatus;
    user: User;
    userId: number;
}

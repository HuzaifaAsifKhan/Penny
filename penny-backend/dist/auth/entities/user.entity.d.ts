import { BaseEntity } from 'typeorm';
import { IJwtPayload } from '../dto/jwt-payload.interface';
import { Product } from '../../product/entities/product.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    password: string;
    salt: string;
    products: Product[];
    genSalt(): Promise<string>;
    hashPassword(password: string, salt: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
    toAuthJSON(): Promise<IJwtPayload>;
}

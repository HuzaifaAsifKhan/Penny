import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductFilterDto } from '../dto/get-product-filter.dto';
import { ProductStatus } from '../dto/product-model';
import { Product } from './product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async getProducts(
    filterDto: GetProductFilterDto,
    user: User,
  ): Promise<Product[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('product');
    query.where('product.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('product.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(product.title LIKE :search OR product.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    try {
      return await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { title, description } = createProductDto;
    const product = new Product();
    product.title = title;
    product.description = description;
    product.status = ProductStatus.Active;
    product.user = user;
    return await product.save();
  }
}

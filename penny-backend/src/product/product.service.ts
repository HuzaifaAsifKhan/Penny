import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './entities/product.repository';
import { User } from '../auth/entities/user.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from './dto/product-model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getProducts(
    filterDto: GetProductFilterDto,
    user: User,
  ): Promise<Product[]> {
    return this.productRepository.getProducts(filterDto, user);
  }

  async deleteProduct(id: number, user: User): Promise<any> {
    const result = await this.productRepository.delete({ id, userId: user.id }); // Need a condition
    if (result.affected == 0) {
      throw new NotFoundException(`Product With ID "${id}" not found.`);
    }
  }

  async createProduct(
    createProductDTo: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDTo, user);
  }
}

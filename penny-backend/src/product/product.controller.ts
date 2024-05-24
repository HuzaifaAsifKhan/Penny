import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/dto/get-user.decorator';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductStatus } from './dto/product-model';
import { AuthGuard } from '@nestjs/passport';
import { ProductStatusValidationPipe } from './pipe/product-status-validation';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductFilterDto,
    @GetUser() user: User,
  ): Promise<Product[]> {
    return this.productService.getProducts(filterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, user);
  }

  @Delete('/:id')
  deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<any> {
    return this.productService.deleteProduct(id, user);
  }
}

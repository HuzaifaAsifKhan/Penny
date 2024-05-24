import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ProductStatus } from './product-model';

export class GetProductFilterDto {
  @IsOptional()
  @IsIn([ProductStatus.Active, ProductStatus.InActive])
  status: ProductStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

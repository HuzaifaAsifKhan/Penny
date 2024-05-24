import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProductStatus } from '../dto/product-model';

export class ProductStatusValidationPipe implements PipeTransform {
  readonly productStatus = ProductStatus;
  constructor() {}

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return Object.values(this.productStatus).includes(status);
  }
}

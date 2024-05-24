import { PipeTransform } from '@nestjs/common';
import { ProductStatus } from '../dto/product-model';
export declare class ProductStatusValidationPipe implements PipeTransform {
    readonly productStatus: typeof ProductStatus;
    constructor();
    transform(value: any): any;
    private isStatusValid;
}

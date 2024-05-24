"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const product_model_1 = require("../dto/product-model");
class ProductStatusValidationPipe {
    constructor() {
        this.productStatus = product_model_1.ProductStatus;
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }
    isStatusValid(status) {
        return Object.values(this.productStatus).includes(status);
    }
}
exports.ProductStatusValidationPipe = ProductStatusValidationPipe;
//# sourceMappingURL=product-status-validation.js.map
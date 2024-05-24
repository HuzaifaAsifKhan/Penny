"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const user_entity_1 = require("../auth/entities/user.entity");
const get_user_decorator_1 = require("../auth/dto/get-user.decorator");
const get_product_filter_dto_1 = require("./dto/get-product-filter.dto");
const create_product_dto_1 = require("./dto/create-product.dto");
const passport_1 = require("@nestjs/passport");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts(filterDto, user) {
        return this.productService.getProducts(filterDto, user);
    }
    createProduct(createProductDto, user) {
        return this.productService.createProduct(createProductDto, user);
    }
    deleteProduct(id, user) {
        return this.productService.deleteProduct(id, user);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_product_filter_dto_1.GetProductFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map
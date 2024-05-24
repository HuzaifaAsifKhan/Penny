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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_model_1 = require("../dto/product-model");
const product_entity_1 = require("./product.entity");
let ProductRepository = class ProductRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(product_entity_1.Product, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async getProducts(filterDto, user) {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('product');
        query.where('product.userId = :userId', { userId: user.id });
        if (status) {
            query.andWhere('product.status = :status', { status });
        }
        if (search) {
            query.andWhere('(product.title LIKE :search OR product.description LIKE :search)', { search: `%${search}%` });
        }
        try {
            return await query.getMany();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async createProduct(createProductDto, user) {
        const { title, description } = createProductDto;
        const product = new product_entity_1.Product();
        product.title = title;
        product.description = description;
        product.status = product_model_1.ProductStatus.Active;
        product.user = user;
        return await product.save();
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map
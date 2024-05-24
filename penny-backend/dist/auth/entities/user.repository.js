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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const jwt_1 = require("@nestjs/jwt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    constructor(dataSource, jwtService) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.jwtService = jwtService;
    }
    async signUp(authCredentialsDto) {
        console.log(authCredentialsDto);
        const { username, password } = authCredentialsDto;
        const user = new user_entity_1.User();
        user.username = username;
        user.salt = await user.genSalt();
        user.password = await user.hashPassword(password, user.salt);
        try {
            await user.save();
        }
        catch (error) {
            console.log(error);
            if (error.code == 23505) {
                throw new common_1.ConflictException(error?.detail ? error?.detail : 'Already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async logIn(authCredentialsDto) {
        console.log(authCredentialsDto);
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ where: { username } });
        if (user && (await user.validatePassword(password))) {
            const payload = await user.toAuthJSON();
            const token = await this.jwtService.sign(payload);
            return { username: payload.username, token };
        }
        else {
            throw new common_1.UnauthorizedException(`Invalid Credentials`);
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        jwt_1.JwtService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map
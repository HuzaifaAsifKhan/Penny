"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config = require("config");
const DBConfig = config.get('db');
exports.typeOrmConfig = {
    type: process.env.DB_TYPE || DBConfig.type,
    host: process.env.PG_HOST || DBConfig.host,
    port: process.env.PG_PORT || DBConfig.port,
    username: process.env.PG_USERNAME || DBConfig.username,
    password: process.env.PG_PASSWORD || DBConfig.password,
    database: process.env.PG_NAME || DBConfig.database,
    entities: [__dirname + '/../**/*.entity.{ts, js}'],
    synchronize: process.env.TYPEORM_SYNC || DBConfig.synchronize,
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm.config.js.map
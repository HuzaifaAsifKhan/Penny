import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const DBConfig = config.get('db');

// console.log(process.env, DBConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
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

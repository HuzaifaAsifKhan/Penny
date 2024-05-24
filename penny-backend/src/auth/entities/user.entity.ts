import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from '../dto/jwt-payload.interface';
import { Product } from '../../product/entities/product.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Product, (product) => product.user, { eager: true })
  products: Product[];

  async genSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash == this.password;
  }

  async toAuthJSON(): Promise<IJwtPayload> {
    return {
      id: this.id,
      username: this.username,
    };
  }
}

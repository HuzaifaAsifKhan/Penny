import { User } from '../../auth/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from '../dto/product-model';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ProductStatus;

  @ManyToOne(() => User, (user) => user.products, { eager: false })
  user: User;

  @Column()
  userId: number;
}

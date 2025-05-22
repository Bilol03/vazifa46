import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { User } from 'src/user/entities/auth.entity';
import { Book } from 'src/books/entities/book.entity';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.orders, { eager: true })
  @JoinTable()
  books: Book[];

  @Field(() => Number, ({description: 'Order total price'}))
  total_price: number

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

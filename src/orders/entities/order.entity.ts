import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/auth.entity';
import { Book } from 'src/books/entities/book.entity';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // Har bir order bitta userga tegishli
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  // Har bir orderda bir nechta book bo‘lishi mumkin
  @Field(() => [Book])
  @ManyToMany(() => Book, (book) => book.orders, { eager: true })
  @JoinTable()
  books: Book[];

  // Buyurtma yaratilgan vaqti
  @Field()
  @CreateDateColumn()
  createdAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';

@ObjectType()
@Entity()
export class Book {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [Order], { nullable: true })
  @ManyToMany(() => Order, (order) => order.books)
  orders?: Order[];
}

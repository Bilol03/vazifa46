import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {

  @Field(() => String, ({description: "Title"}))
  title: string;

  @Field(() => String, ({description: "Author"}))
  author: string;

  @Field(() => Float, ({description: "Price"}))
  price: number;

  @Field({ nullable: true })
  description?: string;


}

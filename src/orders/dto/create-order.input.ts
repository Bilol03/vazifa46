import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => ID, ({ description: 'ID of the user' }))
  userId: number;

  @Field(() => [ID], ({ description: 'List of book IDs' }))
  bookIds: number[];
}

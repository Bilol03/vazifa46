import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateAuthInput } from './register_dto.input';

@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {
  @Field(() => String, { description: 'Enter your email' })
  email: string;
  @Field(() => String, { description: 'Enter your password' })
  password: string;
}

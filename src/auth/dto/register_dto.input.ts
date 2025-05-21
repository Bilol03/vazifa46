import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';

export enum Role {
  admin = 'admin',
  user = 'user'
}
registerEnumType(Role, {
  name: 'Role', // Name shown in GraphQL schema
  description: 'User roles within the system',
});

@InputType()
export class CreateAuthInput {
  @Field(() => String, { description: 'Enter your name' })
  name: string;
  @Field(() => String, { description: 'Enter your surname' })
  surname: string;
  @Field(() => String, { description: 'Enter your email' })
  email: string;
  @Field(() => String, { description: 'Enter your password' })
  password: string;

}

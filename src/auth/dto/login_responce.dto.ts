import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/auth.entity';

@ObjectType()
export class LoginResponse {
  @Field(() => String, ({description: 'Access token'}))
  accessToken: string;

  @Field(() => User)
  user: User;
}

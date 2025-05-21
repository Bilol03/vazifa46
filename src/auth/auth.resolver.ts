import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/auth.entity';
import { AuthService } from './auth.service';
import { UpdateAuthInput } from './dto/login_dto.input';
import { CreateAuthInput } from './dto/register_dto.input';
import { LoginResponse } from './dto/login_responce.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'register' })
  register(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.register(createAuthInput);
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  async login(@Args('UpdateAuthInput') updateAuthInput: UpdateAuthInput){
    return await this.authService.login(updateAuthInput)
  }
}

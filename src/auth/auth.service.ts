import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/auth.entity';
import { UpdateAuthInput } from './dto/login_dto.input';
import { CreateAuthInput } from './dto/register_dto.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createAuthInput: CreateAuthInput) {
    const data = await this.authRepo.create(createAuthInput);
    const result = await this.authRepo.save(data);
    return result;
  }

  async login(updateAuthInput: UpdateAuthInput) {
    const user = await this.authRepo.findOne({
      where: { email: updateAuthInput.email },
    });
    console.log(user);

    if (!user || !(await user.comparePassword(updateAuthInput.password)))
      throw new NotFoundError('User not found');
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user};
  }
}

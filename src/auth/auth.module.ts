import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config()

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions: { expiresIn: process.env.expireJWT },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}

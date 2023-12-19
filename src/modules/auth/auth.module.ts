import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { serverConfig } from 'src/config/config';
@Module({
  imports: [UsersModule, PassportModule,
  ],
  controllers: [AuthController],
})
export class AuthModule { }

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { serverConfig } from 'src/config/config';

@Module({
  imports: [
    JwtModule.register({
      secret: serverConfig.jwt_secret,
      signOptions: { expiresIn: '600000s' },
    }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule { }

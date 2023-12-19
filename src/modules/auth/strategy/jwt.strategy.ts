import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Body } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import { serverConfig } from 'src/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: serverConfig.jwt_secret,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload) {
        return payload;
    }

}
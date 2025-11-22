import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type payload = {
  userId: string;
  fullname: string;
  email: string;
  profile_picture: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  validate(payload: any): payload {
    return {
      userId: payload.sub,
      fullname: payload.fullname,
      email: payload.email,
      profile_picture: payload.profile_picture,
    };
  }
}

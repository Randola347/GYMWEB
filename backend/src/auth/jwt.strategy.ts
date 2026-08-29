import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'dev-secret-change-me',
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
    gymId?: string | null;
    role: string;
  }) {
    return {
      sub: payload.sub,
      email: payload.email,
      gymId: payload.gymId,
      role: payload.role,
    };
  }
}

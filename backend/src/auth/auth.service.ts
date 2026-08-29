import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { GymsService } from '../gyms/gyms.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly gymsService: GymsService,
    private readonly usersService: UsersService,
  ) {}

  async register(input: {
    gymName: string;
    ownerName: string;
    email: string;
    password: string;
  }) {
    const normalizedEmail = input.email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findFirst({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists.');
    }

    const gym = await this.gymsService.createGym({ name: input.gymName });
    const passwordHash = await bcrypt.hash(input.password, 12);

    const user = await this.usersService.createUser({
      gymId: gym.id,
      name: input.ownerName,
      email: normalizedEmail,
      passwordHash,
      role: UserRole.OWNER,
    });

    return this.buildAuthResponse(user);
  }

  async login(input: { email: string; password: string }) {
    const normalizedEmail = input.email.trim().toLowerCase();

    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return this.buildAuthResponse(user);
  }

  async me(user: { sub: string; gymId?: string | null; role: string }) {
    const currentUser = await this.prisma.user.findFirst({
      where: {
        id: user.sub,
        ...(user.gymId ? { gymId: user.gymId } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        gymId: true,
        status: true,
      },
    });

    if (!currentUser) {
      throw new UnauthorizedException('User not found.');
    }

    return currentUser;
  }

  private buildAuthResponse(user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    gymId: string | null;
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      gymId: user.gymId,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        gymId: user.gymId,
      },
    };
  }
}

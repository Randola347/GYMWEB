import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: {
    gymId: string;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    status?: UserStatus;
  }) {
    return this.prisma.user.create({
      data: {
        gymId: input.gymId,
        name: input.name,
        email: input.email.toLowerCase(),
        passwordHash: input.passwordHash,
        role: input.role,
        status: input.status ?? UserStatus.ACTIVE,
      },
    });
  }

  async findByEmail(email: string, gymId?: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        ...(gymId ? { gymId } : {}),
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByIdForGym(id: string, gymId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        gymId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found for this gym.');
    }

    return user;
  }
}

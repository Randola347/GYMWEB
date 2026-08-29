import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GymsService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);
  }

  async createGym(input: { name: string; slug?: string }) {
    const slug = (input.slug ?? this.slugify(input.name)) || 'gym';

    const existingGym = await this.prisma.gym.findUnique({
      where: { slug },
    });

    if (existingGym) {
      throw new ConflictException('A gym with this slug already exists.');
    }

    try {
      return await this.prisma.gym.create({
        data: {
          name: input.name,
          slug,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Unable to create gym.');
    }
  }

  async findById(gymId: string) {
    return this.prisma.gym.findUnique({
      where: { id: gymId },
    });
  }
}

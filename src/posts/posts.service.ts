import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return this.prisma.blogPost.create({ data: createPostDto });
  }

  async findAll() {
    return this.prisma.blogPost.findMany({ include: { comments: true } });
  }

  async findOne(id: string) {
    return this.prisma.blogPost.findUnique({ where: { id }, include: { comments: true } });
  }
}

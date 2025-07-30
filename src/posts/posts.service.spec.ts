import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../database/prisma.service';

describe('PostsService', () => {
  let service: PostsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: {
            blogPost: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto = { title: 'Test Post', content: 'This is a test post.' };
      const expectedPost = { id: '1', ...createPostDto, createdAt: new Date(), updatedAt: new Date(), comments: [] };
      jest.spyOn(prisma.blogPost, 'create').mockResolvedValue(expectedPost);

      const result = await service.create(createPostDto);
      expect(result).toEqual(expectedPost);
      expect(prisma.blogPost.create).toHaveBeenCalledWith({ data: createPostDto, include: { comments: true } });
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const expectedPosts = [
        { id: '1', title: 'Post 1', content: 'Content 1', createdAt: new Date(), updatedAt: new Date(), comments: [] },
        { id: '2', title: 'Post 2', content: 'Content 2', createdAt: new Date(), updatedAt: new Date(), comments: [] },
      ];
      jest.spyOn(prisma.blogPost, 'findMany').mockResolvedValue(expectedPosts);

      const result = await service.findAll();
      expect(result).toEqual(expectedPosts);
      expect(prisma.blogPost.findMany).toHaveBeenCalledWith({ include: { comments: true } });
    });
  });

  describe('findOne', () => {
    it('should return a single post by ID', async () => {
      const postId = '1';
      const expectedPost = { id: postId, title: 'Post 1', content: 'Content 1', createdAt: new Date(), updatedAt: new Date(), comments: [] };
      jest.spyOn(prisma.blogPost, 'findUnique').mockResolvedValue(expectedPost);

      const result = await service.findOne(postId);
      expect(result).toEqual(expectedPost);
      expect(prisma.blogPost.findUnique).toHaveBeenCalledWith({ where: { id: postId }, include: { comments: true } });
    });

    it('should return null if post not found', async () => {
      const postId = 'nonexistent';
      jest.spyOn(prisma.blogPost, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(postId);
      expect(result).toBeNull();
      expect(prisma.blogPost.findUnique).toHaveBeenCalledWith({ where: { id: postId }, include: { comments: true } });
    });
  });
});

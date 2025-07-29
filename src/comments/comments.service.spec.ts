import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { PrismaService } from '../database/prisma.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: PrismaService,
          useValue: {
            comment: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const postId = 'post123';
      const createCommentDto = { content: 'This is a test comment.' };
      const expectedComment = { id: '1', ...createCommentDto, postId, createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(prisma.comment, 'create').mockResolvedValue(expectedComment);

      const result = await service.create(postId, createCommentDto);
      expect(result).toEqual(expectedComment);
      expect(prisma.comment.create).toHaveBeenCalledWith({
        data: {
          ...createCommentDto,
          postId,
        },
      });
    });
  });
});

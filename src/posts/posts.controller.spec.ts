import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSummaryDto, PostWithCommentsDto } from './dto/post-response.dto';
import { PostNotFoundException } from '../common/exceptions/post-not-found.exception';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto = { title: 'Test Post', content: 'Test Content' };
      const expectedResult = { id: '1', ...createPostDto, createdAt: new Date(), updatedAt: new Date(), comments: [] };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createPostDto);
      expect(result).toEqual(Object.assign(new PostWithCommentsDto(), expectedResult));
      expect(service.create).toHaveBeenCalledWith(createPostDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const mockPosts = [
        { id: '1', title: 'Post 1', content: 'Content 1', createdAt: new Date(), updatedAt: new Date(), comments: [] },
        { id: '2', title: 'Post 2', content: 'Content 2', createdAt: new Date(), updatedAt: new Date(), comments: [] },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockPosts);

      const result = await controller.findAll();
      expect(result).toEqual(mockPosts.map(post => Object.assign(new PostSummaryDto(), { ...post, commentCount: post.comments.length })));
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      const postId = '1';
      const expectedResult = { id: postId, title: 'Post 1', content: 'Content 1', createdAt: new Date(), updatedAt: new Date(), comments: [] };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(postId);
      expect(result).toEqual(Object.assign(new PostWithCommentsDto(), expectedResult));
      expect(service.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw PostNotFoundException if post not found', async () => {
      const postId = 'nonexistent';
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(postId)).rejects.toThrow(PostNotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(postId);
    });
  });
});

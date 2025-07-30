import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PostsService } from '../posts/posts.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { PostNotFoundException } from '../common/exceptions/post-not-found.exception';

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: CommentsService;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: PostsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment for a post', async () => {
      const postId = 'post123';
      const createCommentDto = { content: 'Test Comment' };
      const mockPost = { id: postId, title: 'Post', content: 'Content', createdAt: new Date(), updatedAt: new Date(), comments: [] };
      const expectedComment = { id: 'comment1', ...createCommentDto, postId, createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);
      jest.spyOn(commentsService, 'create').mockResolvedValue(expectedComment);

      const result = await controller.create(postId, createCommentDto);
      expect(result).toEqual(Object.assign(new CommentResponseDto(), expectedComment));
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
      expect(commentsService.create).toHaveBeenCalledWith(postId, createCommentDto);
    });

    it('should throw PostNotFoundException if post does not exist', async () => {
      const postId = 'nonexistent';
      const createCommentDto = { content: 'Test Comment' };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(null);

      await expect(controller.create(postId, createCommentDto)).rejects.toThrow(PostNotFoundException);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
      expect(commentsService.create).not.toHaveBeenCalled();
    });
  });
});

import { Controller, Post, Body, Param, UseInterceptors, ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PostsService } from '../posts/posts.service';
import { PostNotFoundException } from '../common/exceptions/post-not-found.exception';

@ApiTags('comments')
@Controller('posts/:postId/comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a comment to a blog post' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The comment has been successfully added.', type: CommentResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
  @ApiBody({ type: CreateCommentDto })
  async create(@Param('postId') postId: string, @Body() createCommentDto: CreateCommentDto): Promise<CommentResponseDto> {
    const post = await this.postsService.findOne(postId);
    if (!post) {
      throw new PostNotFoundException(postId);
    }
    const comment = await this.commentsService.create(postId, createCommentDto);
    return Object.assign(new CommentResponseDto(), comment);
  }
}

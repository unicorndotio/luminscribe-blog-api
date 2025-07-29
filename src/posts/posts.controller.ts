import { Controller, Get, Post, Body, Param, UseInterceptors, ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostSummaryDto, PostWithCommentsDto } from './dto/post-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PostNotFoundException } from '../common/exceptions/post-not-found.exception';

@ApiTags('posts')
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The post has been successfully created.', type: PostWithCommentsDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
  @ApiBody({ type: CreatePostDto })
  async create(@Body() createPostDto: CreatePostDto): Promise<PostWithCommentsDto> {
    const post = await this.postsService.create(createPostDto);
    return Object.assign(new PostWithCommentsDto(), post);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all blog posts with comment counts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved posts.', type: [PostSummaryDto] })
  async findAll(): Promise<PostSummaryDto[]> {
    const posts = await this.postsService.findAll();
    return posts.map(post => Object.assign(new PostSummaryDto(), { ...post, commentCount: post.comments.length }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single blog post by ID with its comments' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved post.', type: PostWithCommentsDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found.' })
  async findOne(@Param('id') id: string): Promise<PostWithCommentsDto> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return Object.assign(new PostWithCommentsDto(), post);
  }
}

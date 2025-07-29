import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/database/prisma.service';

describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    // Clear the database before each test
    await prismaService.comment.deleteMany();
    await prismaService.blogPost.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/posts (POST) - should create a new post', () => {
    const createPostDto = {
      title: 'Test Post Title',
      content: 'Test Post Content',
    };
    return request(app.getHttpServer())
      .post('/api/posts')
      .send(createPostDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe(createPostDto.title);
        expect(res.body.content).toBe(createPostDto.content);
        expect(res.body.comments).toEqual([]);
      });
  });

  it('/api/posts (GET) - should return all posts', async () => {
    await request(app.getHttpServer())
      .post('/api/posts')
      .send({ title: 'Post 1', content: 'Content 1' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/api/posts')
      .send({ title: 'Post 2', content: 'Content 2' })
      .expect(201);

    return request(app.getHttpServer())
      .get('/api/posts')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveLength(2);
        expect(res.body[0].title).toBe('Post 1');
        expect(res.body[1].title).toBe('Post 2');
      });
  });

  it('/api/posts/:id (GET) - should return a single post by ID', async () => {
    const createPostDto = {
      title: 'Single Post Title',
      content: 'Single Post Content',
    };
    const postResponse = await request(app.getHttpServer())
      .post('/api/posts')
      .send(createPostDto)
      .expect(201);

    const postId = postResponse.body.id;

    return request(app.getHttpServer())
      .get(`/api/posts/${postId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(postId);
        expect(res.body.title).toBe(createPostDto.title);
        expect(res.body.content).toBe(createPostDto.content);
      });
  });

  it('/api/posts/:id/comments (POST) - should add a comment to a post', async () => {
    const createPostDto = {
      title: 'Post with Comments',
      content: 'Content for comments',
    };
    const postResponse = await request(app.getHttpServer())
      .post('/api/posts')
      .send(createPostDto)
      .expect(201);

    const postId = postResponse.body.id;
    const createCommentDto = { content: 'This is a new comment.' };

    return request(app.getHttpServer())
      .post(`/api/posts/${postId}/comments`)
      .send(createCommentDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.content).toBe(createCommentDto.content);
        expect(res.body.postId).toBe(postId);
      });
  });
});

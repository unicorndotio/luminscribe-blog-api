# Blogging Platform API - Project Requirements Document

## 1. Project Overview

### 1.1 Objective

Design and implement a production-ready RESTful API for a simple blogging
platform that manages blog posts and comments with a 4-hour development
constraint.

### 1.2 Success Criteria

- Clean, maintainable code architecture
- Proper error handling and validation
- Comprehensive documentation
- Easy setup and deployment
- Scalable design patterns

## 2. Technical Architecture

### 2.1 Recommended Technology Stack

- **Runtime**: [Bun](https://bun.sh/) (v1.0+) - Fast JavaScript runtime with built-in bundler, test runner, and package manager
- **Framework**: [NestJS](https://nestjs.com/) with TypeScript - Enterprise-grade framework with built-in DTOs, validation, and dependency injection
- **Database**: [Neon PostgreSQL](https://neon.tech/) with [Prisma ORM](https://www.prisma.io/)
- **Validation**: [class-validator](https://github.com/typestack/class-validator) + [class-transformer](https://github.com/typestack/class-transformer) (NestJS ecosystem)
- **Testing**: [Jest](https://jestjs.io/) + [Supertest](https://github.com/visionmedia/supertest)
- **Documentation**: [NestJS Swagger integration](https://docs.nestjs.com/openapi/introduction) (@nestjs/swagger)
- **Containerization**: [Docker](https://www.docker.com/)
- **Deployment Platform**: [Render](https://render.com/)

### 2.2 Technology Stack Benefits

- **Bun advantages**: 3x faster than Node.js, built-in TypeScript support,
  integrated testing, zero-config bundling
- **NestJS advantages**: Built-in DTOs with validation, dependency injection,
  modular architecture, excellent TypeScript support
- **Synergy**: Bun's speed + NestJS's structure = rapid development with
  enterprise patterns

## 3. System Design & Architecture Patterns

### 3.1 Architectural Pattern: NestJS Modular Architecture

```
┌─────────────────────┐
│   Controller Layer  │ ← HTTP requests, DTOs, Guards, Interceptors
├─────────────────────┤
│    Service Layer    │ ← Business logic, dependency injection
├─────────────────────┤
│  Repository Layer   │ ← Data access abstraction (optional with Prisma)
├─────────────────────┤
│    Database Layer   │ ← PostgreSQL with Prisma
└─────────────────────┘

Module Structure:
├── PostsModule
│   ├── PostsController
│   ├── PostsService
│   └── DTOs (CreatePostDto, PostResponseDto)
└── CommentsModule
    ├── CommentsController
    ├── CommentsService
    └── DTOs (CreateCommentDto, CommentResponseDto)
```

### 3.2 Design Patterns to Implement

#### 3.2.1 Module Pattern (NestJS Core)

- Feature-based module organization
- Clear separation of concerns
- Lazy loading capabilities

#### 3.2.2 Dependency Injection (Built-in NestJS)

- Constructor injection with @Injectable() decorators
- Provider registration in modules
- Easy mocking for testing

#### 3.2.3 DTO Pattern (NestJS + class-validator)

- Strong typing for request/response objects
- Automatic validation with decorators
- Transformation and serialization

#### 3.2.4 Guard Pattern

- Route protection and validation
- Centralized authorization logic
- Request preprocessing

#### 3.2.5 Interceptor Pattern

- Response transformation
- Logging and monitoring
- Error handling enhancement

## 4. Data Models & Database Design

### 4.1 Entity Relationship Diagram

```
BlogPost (1) ──────── (N) Comment
   │                     │
   ├─ id (UUID/INT)      ├─ id (UUID/INT)
   ├─ title (STRING)     ├─ content (TEXT)
   ├─ content (TEXT)     ├─ post_id (FK)
   ├─ created_at         ├─ created_at
   └─ updated_at         └─ updated_at
```

### 4.2 Database Schema Considerations

- Use UUIDs for public-facing IDs (security)
- Add indexes on frequently queried fields
- Implement soft deletes for audit trail
- Consider adding user_id for future user management

### 4.3 Sample Prisma Schema

```prisma
model BlogPost {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  comments  Comment[]
  
  @@map("blog_posts")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  postId    String
  post      BlogPost @relation(fields: [postId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("comments")
}
```

## 5. API Design & Endpoints

### 5.1 RESTful API Specification

#### 5.1.1 Base URL Structure

```
https://api.blogplatform.com/v1
```

#### 5.1.2 Endpoint Specifications

| Method | Endpoint                   | Description                        | Request Body           | Response           |
| ------ | -------------------------- | ---------------------------------- | ---------------------- | ------------------ |
| GET    | `/api/posts`               | List all posts with comment counts | None                   | `PostSummary[]`    |
| POST   | `/api/posts`               | Create new post                    | `CreatePostRequest`    | `BlogPost`         |
| GET    | `/api/posts/{id}`          | Get post with comments             | None                   | `PostWithComments` |
| POST   | `/api/posts/{id}/comments` | Add comment to post                | `CreateCommentRequest` | `Comment`          |

### 5.2 NestJS DTOs and Validation

```typescript
// Request DTOs with validation
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    example: "My First Blog Post",
    description: "The title of the blog post",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    example: "This is the content of my blog post...",
    description: "The content of the blog post",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10000)
  content: string;
}

export class CreateCommentDto {
  @ApiProperty({
    example: "Great post! Thanks for sharing.",
    description: "The comment content",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  content: string;
}

// Response DTOs with serialization
import { Exclude, Expose, Type } from "class-transformer";

export class PostSummaryDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  commentCount: number;

  @Expose()
  createdAt: Date;
}

export class CommentResponseDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;
}

export class PostWithCommentsDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => CommentResponseDto)
  comments: CommentResponseDto[];
}
```

### 5.3 HTTP Status Codes

- `200 OK`: Successful GET requests
- `201 Created`: Successful POST requests
- `400 Bad Request`: Validation errors
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server errors

## 6. Implementation Strategy

### 6.1 NestJS Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root application module
├── posts/                 # Posts feature module
│   ├── posts.module.ts
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   ├── dto/
│   │   ├── create-post.dto.ts
│   │   └── post-response.dto.ts
│   └── entities/
│       └── post.entity.ts
├── comments/              # Comments feature module
│   ├── comments.module.ts
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   ├── dto/
│   │   ├── create-comment.dto.ts
│   │   └── comment-response.dto.ts
│   └── entities/
│       └── comment.entity.ts
├── common/                # Shared utilities
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Response interceptors
│   ├── guards/           # Route guards
│   └── pipes/            # Validation pipes
├── database/             # Database configuration
│   ├── prisma.service.ts
│   └── migrations/
├── config/               # Configuration files
└── test/                 # E2E tests
    └── app.e2e-spec.ts
```

### 6.2 Development Phases (4-hour constraint)

#### Phase 1 (Completed): Project Setup & Core Infrastructure

- ✅ Initialized Bun project with NestJS CLI.
- ✅ Set up PostgreSQL with Neon DB (replaced Docker Compose for production).
- ✅ Configured Prisma schema and migrations.
- ✅ Set up NestJS modules (PostsModule, CommentsModule).
- ✅ Configured global validation pipe and exception filters.

#### Phase 2 (Completed): Core API Implementation

- ✅ Created DTOs with class-validator decorators.
- ✅ Implemented PrismaService for database access.
- ✅ Built PostsService and CommentsService with business logic.
- ✅ Created controllers with proper decorators (@Get, @Post, @Body, @Param).
- ✅ Added Swagger documentation with @ApiProperty decorators.

#### Phase 3 (Completed): Testing & Documentation

- ✅ Wrote unit tests for services.
- ✅ Added integration tests for controllers.
- ✅ Configured automatic API documentation generation.
- ✅ Implemented global error handling and logging.

#### Phase 4 (In Progress): Polish & Deployment

- ✅ Docker containerization with multi-stage builds.
- ✅ Updated README documentation with Bun-specific setup instructions.
- ⬜ Deploying to Render.
- ⬜ Add health check endpoint.
- ⬜ Final testing and performance validation.

## 7. Best Practices to Follow

### 7.1 Code Quality

- **NestJS decorators** for clean, declarative code
- **class-validator** for automatic DTO validation
- **ESLint + Prettier** with NestJS recommended rules
- **Bun's built-in TypeScript** support (no compilation needed)
- **Modular architecture** following NestJS best practices

### 7.2 Error Handling

- **Global exception filter** using @Catch() decorators
- **Custom exception classes** extending HttpException
- **Validation pipe** for automatic DTO validation errors
- **Standardized error responses** with proper HTTP status codes

### 7.3 Security Considerations

- **Built-in validation** with class-validator guards
- **CORS middleware** configuration in main.ts
- **Rate limiting** with @nestjs/throttler
- **Environment configuration** with @nestjs/config module

### 7.4 Performance Optimizations

- **Bun's native speed** (3x faster than Node.js)
- **Prisma query optimization** with select and include
- **Response transformation** using Interceptors
- **Connection pooling** configured in PrismaService

## 8. Testing Strategy

### 8.1 Testing Pyramid

```
┌─────────────────┐
│  Integration    │ ← API endpoint tests
├─────────────────┤
│  Unit Tests     │ ← Service & repository tests
├─────────────────┤
│  Component      │ ← Controller tests
└─────────────────┘
```

### 8.2 Test Coverage Goals

- **Services**: 90%+ coverage for business logic
- **Controllers**: HTTP response validation
- **Repositories**: Database interaction verification

## 9. Future Enhancements (Next Steps)

### 9.1 Immediate Improvements (if more time available)

- **Pagination** for GET /api/posts endpoint
- **Search functionality** for posts by title/content
- **Comment threading** for nested replies
- **User authentication** and authorization
- **Input/output serialization** improvements

### 9.2 Advanced Features

- **Caching layer** (Redis) for improved performance
- **Full-text search** with Elasticsearch
- **Image upload** support for posts
- **Real-time notifications** for new comments
- **API versioning** strategy
- **Monitoring and logging** with structured logs

### 9.3 DevOps & Production Readiness

- **CI/CD pipeline** with GitHub Actions
- **Health check endpoints** for monitoring
- **Metrics collection** with Prometheus
- **Distributed tracing** for debugging
- **Load balancing** configuration

## 10. Risk Mitigation

### 10.1 Technical Risks

- **Database connection failures**: Implement connection retry logic
- **High comment volume**: Consider pagination and caching
- **Memory leaks**: Proper resource cleanup and monitoring

### 10.2 Time Constraints

- **MVP approach**: Focus on core functionality first
- **Documentation over perfect code**: Explain decisions in README
- **Testing priority**: Focus on critical path testing

## 11. Success Metrics

### 11.1 Code Quality Indicators

- All endpoints return appropriate HTTP status codes
- Input validation prevents invalid data entry
- Error responses are consistent and informative
- Code is well-documented and follows TypeScript best practices

### 11.2 Functional Requirements

- ✅ All 4 required endpoints implemented
- ✅ Proper data relationships between posts and comments
- ✅ RESTful API design principles followed
- ✅ Production-ready error handling and validation

# Luminscribe Blog API

## Project Overview

This is a production-ready RESTful API for a simple blogging platform that manages blog posts and comments, built with NestJS, Bun, PostgreSQL, and Prisma.

## Features

- Create, retrieve, and manage blog posts.
- Add comments to blog posts.
- Comprehensive API documentation with Swagger.
- Data validation using `class-validator`.
- Modular architecture for clear separation of concerns.

## Technology Stack

- **Runtime**: Bun (v1.0+)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: `class-validator` + `class-transformer`
- **Testing**: Jest (Unit & E2E)
- **Documentation**: `@nestjs/swagger`
- **Containerization**: Docker + Docker Compose

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) (v1.0+)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/luminscribe-blog-api.git
    cd luminscribe-blog-api
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up the database with Docker Compose:**

    ```bash
    docker-compose up -d
    ```

    This will start a PostgreSQL container. The database credentials are:
    -   **User**: `user`
    -   **Password**: `password`
    -   **Database**: `luminscribe_blog`

4.  **Configure Prisma and run migrations:**

    The `.env` file should already be configured with the database URL. If not, create a `.env` file in the project root with the following content:

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/luminscribe_blog?schema=public"
    ```

    Then, run the Prisma migrations to create the database tables:

    ```bash
    bunx prisma migrate dev --name init
    ```

    And generate the Prisma client:

    ```bash
    bunx prisma generate
    ```

### Running the Application

To start the application in development mode:

```bash
bun start:dev
```

The API will be accessible at `http://localhost:3000/api`.

### API Documentation (Swagger)

Once the application is running, you can access the API documentation at:

`http://localhost:3000/api-docs`

## API Endpoints

| Method | Endpoint                   | Description                        | Request Body           | Response           |
| ------ | -------------------------- | ---------------------------------- | ---------------------- | ------------------ |
| GET    | `/api/posts`               | List all posts with comment counts | None                   | `PostSummary[]`    |
| POST   | `/api/posts`               | Create new post                    | `CreatePostDto`        | `BlogPost`         |
| GET    | `/api/posts/{id}`          | Get post with comments             | None                   | `PostWithComments` |
| POST   | `/api/posts/{id}/comments` | Add comment to post                | `CreateCommentDto`     | `Comment`          |

## Running Tests

### Unit Tests

To run all unit tests:

```bash
bun test
```

To run unit tests for a specific service (e.g., PostsService):

```bash
bun test src/posts/posts.service.spec.ts
```

### End-to-End (E2E) Tests

To run all E2E tests:

```bash
bun test test/app.e2e-spec.ts
```

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root application module
├── posts/                 # Posts feature module
│   ├── posts.module.ts
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   ├── dto/                # Data Transfer Objects
│   │   ├── create-post.dto.ts
│   │   └── post-response.dto.ts
│   └── entities/           # (Optional) Type definitions for entities
├── comments/              # Comments feature module
│   ├── comments.module.ts
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   ├── dto/                # Data Transfer Objects
│   │   ├── create-comment.dto.ts
│   │   └── comment-response.dto.ts
│   └── entities/           # (Optional) Type definitions for entities
├── common/                # Shared utilities (e.g., filters, interceptors)
├── database/             # Database configuration and Prisma service
│   ├── prisma.service.ts
│   ├── database.module.ts
│   └── migrations/
├── config/               # Configuration files
└── test/                 # E2E tests
    └── app.e2e-spec.ts
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

- **Runtime**: [Bun](https://bun.sh/) (v1.0+)
- **Framework**: [NestJS](https://nestjs.com/) with TypeScript
- **Database**: [Neon PostgreSQL](https://neon.tech/) (v13+)
- **ORM**: [Prisma](https://www.prisma.io/) (v6.13+)
- **Validation**: [class-validator](https://github.com/typestack/class-validator) + [class-transformer](https://github.com/typestack/class-transformer)
- **Testing**: [Jest](https://jestjs.io/) (Unit & E2E)
- **API Documentation**: [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
- **Containerization**: [Docker](https://www.docker.com/)
- **Deployment Platform**: [Render](https://render.com/)

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

### Set up the database

This project uses [Neon](https://neon.tech/) for its PostgreSQL database. You will need to create a Neon account and a new project to obtain your database connection strings.

1.  **Obtain Connection Strings**: From your Neon project dashboard, get both the **pooled** and **direct** connection strings.

2.  **Configure `.env`**: Create a `.env` file in the project root (or copy from `.env.example`) and add your Neon connection strings:

    ```
    DATABASE_URL="your_pooled_neon_connection_string"
    DIRECT_URL="your_direct_neon_connection_string"
    ```

3.  **Run Prisma Migrations and Seed (if needed)**:

    ```bash
    bunx prisma migrate dev --name init
    bun run db:seed # To seed the database with sample data
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

### Docker Deployment

This application can be deployed using Docker. The Docker image is available on Docker Hub:

[danelux/luminscribe-blog-api](https://hub.docker.com/r/danelux/luminscribe-blog-api)

To build the Docker image locally:

```bash
bun run docker:build
```

To run the Docker image locally:

```bash
bun run docker:run
```

To push the Docker image to Docker Hub (after logging in):

```bash
bun run docker:push
```

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

---

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

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

---

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
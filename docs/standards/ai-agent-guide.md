# AI Agent Guide - Luminscribe Blog API Project Summary

This document serves as a quick reference for the Gemini agent regarding the
`luminscribe-blog-api` project.

## 1. Project Overview

- **Project Name**: Luminscribe Blog API
- **Purpose**: A RESTful API for a simple blogging platform that manages blog
  posts and comments.
- **Current Status**: Core API functionality (CRUD for posts, adding comments),
  validation, error handling, and API documentation are implemented. Unit and
  E2E tests are in place.

## 2. Key Technologies

- **Runtime & Package Manager**: Bun (v1.0+)
- **Application Framework**: NestJS (v10.0+) with TypeScript
- **Database**: PostgreSQL (currently hosted on Neon, previously Docker Compose)
- **ORM**: Prisma (v6.13+)
- **Validation**: `class-validator` and `class-transformer`
- **Testing**: Jest (for both unit and E2E tests)
- **API Documentation**: `@nestjs/swagger`

## 3. Project Structure Highlights

- `src/`: Main application source code.
  - `src/main.ts`: Application entry point, global pipes, filters, and Swagger
    setup.
  - `src/app.module.ts`: Root module, imports feature modules and
    `DatabaseModule`.
  - `src/posts/`: Posts feature module (controller, service, DTOs).
  - `src/comments/`: Comments feature module (controller, service, DTOs).
  - `src/database/`: Contains `PrismaService` and `DatabaseModule` for database
    interactions.
  - `src/common/filters/`: Global exception filter.
  - `src/common/exceptions/`: Custom exception classes (e.g.,
    `PostNotFoundException`).
- `prisma/`: Prisma schema and migrations.
- `test/`: End-to-End (E2E) tests.
- `docs/`: Project documentation (PRD, tech stack, code style).

## 4. Operational Details

- **Database Setup**: PostgreSQL is configured via Neon. The `.env` file
  contains `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) for Prisma.
  - To run migrations: `bunx prisma migrate dev --name <migration_name>`
  - To generate Prisma client: `bunx prisma generate`
- **Starting the Application (Development)**: `bun start:dev` (or `bun start` if
  not watching for changes).
- **API Base URL**: `http://localhost:3000/api`
- **Swagger Documentation**: Accessible at `http://localhost:3000/api-docs`

## 5. Testing Procedures

- **Run All Tests**: `bun test`
- **Run Unit Tests**: `bun test src/<module>/<module>.service.spec.ts` (e.g.,
  `bun test src/posts/posts.service.spec.ts`)
- **Run E2E Tests**: `bun test test/app.e2e-spec.ts`

## 6. Important Considerations

- **Bun vs. Node.js Ecosystem**: While Bun is the runtime, the project heavily
  relies on the NestJS framework, which uses Node.js ecosystem libraries (e.g.,
  Express for HTTP, Jest for testing). Avoid trying to replace these with Bun's
  native APIs unless a major architectural shift is explicitly requested.
- **Dependency Injection**: NestJS's DI system is crucial. Ensure providers are
  correctly declared and imported in modules.
- **Error Handling**: Custom exceptions and a global exception filter are used
  for consistent error responses.

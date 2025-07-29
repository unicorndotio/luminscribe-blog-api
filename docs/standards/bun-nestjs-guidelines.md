---
description: Guidelines for using Bun within a NestJS project.
---

# Bun & NestJS Guidelines

This project uses **Bun** as the primary runtime and package manager, and **NestJS** as the application framework.

## Bun Usage

- Use `bun <file>` instead of `node <file>` or `ts-node <file>` for direct script execution.
- Use `bun test` to run tests (configured with Jest).
- Use `bun install` for package installation.
- Use `bun run <script>` for executing package.json scripts.
- Bun automatically loads `.env` files, so explicit `dotenv` configuration is generally not needed.

## NestJS Framework

This project is built with **NestJS**, which leverages the Node.js ecosystem. Therefore, certain Bun-specific APIs that replace Node.js modules or frameworks are not applicable here.

- **HTTP Server**: NestJS uses `@nestjs/platform-express` (which is built on Express) for handling HTTP requests. Do NOT use `Bun.serve()` for the main application server.
- **Database ORM**: Prisma is used for database interactions with PostgreSQL. Do NOT use `Bun.sql` for database queries.
- **Testing Framework**: Jest is configured for unit and E2E testing. Use `bun test` to execute Jest tests.

## Project Structure

- Follow NestJS modular architecture for organizing code.

For more information on NestJS, refer to its official documentation. For Bun-specific commands, refer to Bun's official documentation.

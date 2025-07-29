# Tech Stack

> Version: 1.0.0 Last Updated: 2025-08-31

## Context

This file is part of an agentic AI standards system. These tech stack defaults
are referenced by the product codebases when initializing new projects.

## Core Technologies

### Runtime

- **Runtime:** Bun
- **Version:** 1.0+

### Application Framework

- **Framework:** NestJS with TypeScript
- **Version:** 10.0+

### Database

- **Primary:** PostgreSQL
- **Version:** 13+
- **ORM:** Prisma
- **Prisma Version:** 6.13+

## Deployment

### CI/CD Pipeline

- **Platform:** GitHub Actions
- **Trigger:** Push to main/staging branches
- **Tests:** Run before deployment

### Environments

- **Production:** main branch
- **Staging:** staging branch
- **Review Apps:** PR-based (optional)

---

_These defaults are used when initializing new projects by humans an AI agents._

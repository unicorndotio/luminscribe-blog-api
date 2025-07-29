# Use a Node.js base image
FROM oven/bun:1.1.18-slim as base

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production image
FROM oven/bun:1.1.18-slim

WORKDIR /usr/src/app

# Copy built application from the base stage
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["bun", "run", "start:prod"]

# Limarpoo Core Backend

This is the central backend service for the Limarpoo E-commerce platform. It provides the REST API consumed by the Storefront, Admin, and Landing applications.

## Technical Stack

We used the following technologies based on performance, type safety, and ease of development:

*   **Framework**: [Express.js](https://expressjs.com/) - A minimal and flexible Node.js web application framework. Chosen for its maturity and vast ecosystem.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - Adds static typing to JavaScript, improving code quality and maintainability.
*   **ORM**: [Prisma](https://www.prisma.io/) - A modern, type-safe Next-generation Node.js and TypeScript ORM. It provides strict type safety and auto-generated migrations.
*   **Database**: [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.
*   **Infrastructure**: [Docker Compose](https://docs.docker.com/compose/) - Used for orchestrating the application and database services for consistent development environments.

## Technical Decisions

### UUID v7 for Primary Keys
We use **UUID v7** (`@default(uuid(7))`) for all primary keys instead of the standard UUID v4.
*   **Reason**: UUID v7 is time-sortable, which improves database index performance (B-tree fragmentation reduction) compared to random UUID v4, while maintaining collision resistance and distributed generation capabilities.

## Project Structure

```
core/
├── prisma/             # Prisma schema and migrations
│   └── schema.prisma   # Database schema definition
├── src/
│   ├── modules/        # Domain-specific modules (future)
│   ├── config/         # Configuration files
│   └── server.ts       # Application entry point
├── Dockerfile          # Docker build instructions
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

*   Docker and Docker Compose installed.

### API Base URL

`http://localhost:3000`

### Running with Docker

The easiest way to run the backend and database is using Docker Compose from the root directory:

```bash
docker-compose up --build
```

This will:
1.  Start the PostgreSQL database.
2.  Build the Core backend image.
3.  Run migrations (configured in entrypoint, or manually).
4.  Start the API server on port 3000.

### Running Locally (Development)

1.  Navigate to the `core` directory:
    ```bash
    cd core
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Set up environment variables:
    Create a `.env` file based on `.env.example` (or use the Docker defaults).

4.  Start the development server:
    ```bash
    bun run dev
    ```

## Database Management

### Development Workflow
The primary command for development is `npx prisma migrate dev`.
**This command does two things:**
1.  **Creates** a new migration file (if schema changes exist).
2.  **Applies** the migration to your local database immediately.

> **Important**: If the command finishes successfully, your database is already up to date!

**Usage:**
```bash
# Interactive (prompts for name)
npx prisma migrate dev

# Non-Interactive (skips prompt)
npx prisma migrate dev --name add_users_table
```

### Verifying Migrations
To check if your database is in sync with your migration files:
```bash
npx prisma migrate status
```

### Applying Pending Migrations
If you pull changes from a teammate and have unapplied migration files:
```bash
npx prisma migrate dev
```
(Prisma will detect the existing files and apply them without creating new ones).

### Production Deployment
When deploying to production (where you do not want to reset the database):
```bash
npx prisma migrate deploy
```

### Database Visualizer
To view and edit your data in a browser interface:
```bash
npx prisma studio
```

### Seeding Data
To populate the database with initial Spanish data (users, products, categories, etc.):
```bash
npx prisma db seed
```

### Resetting the Database
To completely wipe the database (drop all tables), recreate the schema, and run the seed script:
```bash
npx prisma migrate reset
```
> **Warning**: This action is destructive and will delete all data.

### Other Useful Commands
*   **Generate Client**: `npx prisma generate` (Run this after schema changes if not running `migrate dev`)

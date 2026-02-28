# EasyAccomod

A full-stack web application for finding and listing rental accommodations in Vietnam. Landlords can post room listings with photos, pricing, and amenities; renters can search, filter, favorite, comment, and chat with landlords directly.

## Contributors

- Tran Viet Anh
- Dinh Trong Hieu
- Pham Xuan Hanh

---

## Features

**For Renters**
- Browse and search room listings by district, city, price range, and room type
- View detailed room information including photos, utilities, and pricing (monthly / quarterly / yearly)
- Save favorite listings
- Leave star-rated reviews and comments on posts
- Real-time chat with landlords
- Receive notifications when posts are updated or verified

**For Landlords**
- Create and manage room listings with image uploads
- Set different pricing tiers (weekly, monthly, quarterly, yearly)
- Extend listing duration
- View listing statistics

**For Admins**
- Verify and approve new landlord accounts
- Moderate posts, comments, and user reports
- View payment and extension request management

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 9, TypeScript, Angular Material |
| Main API | Node.js, Express, Sequelize ORM |
| Chat server | Node.js, Express, Socket.io 4 |
| Database | MySQL |
| Auth | JWT stored in httpOnly cookie |
| File uploads | Multer (disk storage) |

---

## Prerequisites

- Node.js 18+ and npm
- MySQL 8+
- (Optional) [Bun](https://bun.sh) for the Angular client

---

## Setup

### 1. Database

Create a MySQL database:

```sql
CREATE DATABASE easyaccomod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Main API server (NodeJsServer)

```bash
cd NodeJsServer
cp .env.example .env
# Edit .env with your database credentials and a strong JWT_SECRET
npm install
npm run migrate      # Run all database migrations
npm run server       # Start with nodemon on port 8080
```

**`.env` variables:**

| Variable | Description | Default |
|---|---|---|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | — |
| `DB_PASSWORD` | MySQL password | — |
| `DB_NAME` | Database name | `easyaccomod` |
| `JWT_SECRET` | Secret key for signing JWTs | — |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:4200` |
| `PORT` | Port to listen on | `8080` |

### 3. Chat server (ChatServer)

```bash
cd ChatServer
cp .env.example .env
# Edit .env with the same database credentials
npm install
node server.js       # Start on port 3000
```

**`.env` variables:**

| Variable | Description | Default |
|---|---|---|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | — |
| `DB_PASSWORD` | MySQL password | — |
| `DB_NAME` | Database name | `easyaccomod` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:4200` |

### 4. Angular frontend (client)

```bash
cd client
npm install          # or: bun install
npm start            # Serves on http://localhost:4200
```

To change the backend URLs, edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  chatApiUrl: 'http://localhost:3000'
};
```

---

## Running Tests

```bash
cd NodeJsServer
npm test
```

Runs 18 Jest + Supertest tests covering authentication flows, account validation, and the validation middleware. The test suite mocks the database layer and runs without a live MySQL connection.

---

## Database Migrations

Migrations are managed with `sequelize-cli`:

```bash
cd NodeJsServer

# Apply all pending migrations
npm run migrate

# Roll back all migrations
npm run migrate:undo
```

Migration files live in `NodeJsServer/app/migrations/` and create all tables in the correct foreign-key dependency order.

---

## API Overview

The main API runs on `http://localhost:8080`. All routes are prefixed with `/api`.

| Resource | Base path |
|---|---|
| Accounts | `/api/accounts` |
| Posts | `/api/posts` |
| Rooms | `/api/rooms` |
| Comments | `/api/comments` |
| Favorites | `/api/favorites` |
| Notifications | `/api/notifications` |
| Reports | `/api/reports` |
| Statistics | `/api/statistics` |
| Extend requests | `/api/extend` |
| Users | `/api/users` |
| CSRF token | `/api/csrf-token` |

The chat server runs on `http://localhost:3000` and exposes `/api/message` over HTTP and real-time events over Socket.io.

### Authentication

Login (`POST /api/accounts/login`) sets an `httpOnly; SameSite=Strict` cookie containing the JWT. The cookie is sent automatically with every subsequent request. Logout (`POST /api/accounts/logout`) clears the cookie server-side.

Protected routes require a valid token cookie. The CSRF double-submit pattern protects all state-changing endpoints: the client fetches a CSRF token from `GET /api/csrf-token` on startup and includes it as an `x-csrf-token` header.

---

## Security

- **Helmet.js** — HTTP security headers on both servers
- **CORS** — restricted to the configured `CORS_ORIGIN`
- **JWT in httpOnly cookie** — not accessible from JavaScript
- **CSRF protection** — signed double-submit cookie via `csrf-csrf`
- **Rate limiting** — login: 10 attempts / 15 min; signup: 5 accounts / hour
- **Input validation** — `express-validator` on account, comment, and post endpoints
- **Password hashing** — bcrypt (cost factor 10) on the server
- **Path traversal prevention** — upload paths are validated and resolved against a base directory
- **SQL injection prevention** — parameterized queries via Sequelize ORM

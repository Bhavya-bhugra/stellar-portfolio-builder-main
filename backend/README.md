# Stellar Portfolio Backend Service

Production-ready, lightweight, 100% stateless backend service for the Stellar Portfolio application built with Node.js, Express, TypeScript, Zod, Helmet, and CORS.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Validation**: Zod
- **Security**: Helmet, express-rate-limit
- **Environment Management**: dotenv
- **CORS**: cors middleware

## Directory Structure

```
backend/
├── src/
│   ├── config/          # Environment configuration & Zod schema validation
│   ├── controllers/     # Route handler controllers (thin presentation layer)
│   ├── data/            # Authoritative Q&A corpus data
│   ├── engine/          # TF-IDF classification & tokenizer engine
│   ├── middleware/      # Error handling, logging, 404, rate limiting, and validation
│   ├── routes/          # Express route definitions (health, chess, contact, chat)
│   ├── services/        # Business logic layer (chess, contact, chat, health)
│   ├── types/           # Shared TypeScript interface definitions
│   ├── utils/           # Response formatters and utility functions
│   ├── app.ts           # Express application setup (security, CORS, middleware)
│   └── server.ts        # HTTP server entry point and process signal handlers
├── .env.example         # Environment variable template
├── .gitignore           # Git ignore configuration
├── eslint.config.js     # ESLint configuration
├── package.json         # Dependencies and NPM scripts
├── tsconfig.json        # TypeScript compiler configuration
└── README.md            # Backend documentation
```

## Environment Variables

Copy `.env.example` to `.env` in the `backend` directory:

```env
PORT=5000
FRONTEND_URL=http://localhost:8081
CHESS_USERNAME=yash_2805
NODE_ENV=production

# Rate Limiting Configuration (ms / max requests)
RATE_LIMIT_GLOBAL_WINDOW_MS=900000
RATE_LIMIT_GLOBAL_MAX=100

RATE_LIMIT_CONTACT_WINDOW_MS=900000
RATE_LIMIT_CONTACT_MAX=5

RATE_LIMIT_CHAT_WINDOW_MS=60000
RATE_LIMIT_CHAT_MAX=30

# In-Memory Cache Configuration (ms)
CHESS_CACHE_TTL_MS=300000
```

### Variable Descriptions

- `PORT`: Port on which the Express HTTP server listens (default: `5000`).
- `FRONTEND_URL`: Allowed Origin URL for production CORS configuration (e.g., `https://yashsharma.dev`).
- `CHESS_USERNAME`: Chess.com username for public API fetching (default: `yash_2805`).
- `NODE_ENV`: Runtime environment (`development`, `production`, `test`).
- `RATE_LIMIT_GLOBAL_WINDOW_MS` / `MAX`: Global API rate limit window and max requests (default: 100 req / 15 mins).
- `RATE_LIMIT_CONTACT_WINDOW_MS` / `MAX`: Contact endpoint rate limit window and max requests (default: 5 req / 15 mins).
- `RATE_LIMIT_CHAT_WINDOW_MS` / `MAX`: Chat endpoint rate limit window and max requests (default: 30 req / 1 min).
- `CHESS_CACHE_TTL_MS`: In-memory server cache TTL for Chess.com snapshots (default: 5 mins).

## Installation & Setup

```bash
cd backend
npm install
```

## Development Commands

Start the development server with live reload:

```bash
npm run dev
```

Run ESLint checks:

```bash
npm run lint
```

## Production Build & Execution

Compile TypeScript source files into JavaScript output (`dist/`):

```bash
npm run build
```

Run the compiled production bundle:

```bash
npm run start
```

## API Endpoints

### Health
- `GET /api/health` — Minimal operational status (`status`, `uptimeSeconds`, `timestamp`).

### Chess
- `GET /api/chess/snapshot` — Combined profile, stats, recent games, and rating trend history.
- `GET /api/chess/profile` — Player profile details.
- `GET /api/chess/stats` — Rapid, Blitz, and Bullet ratings.
- `GET /api/chess/games` — Recent games list.
- `GET /api/chess/rating-history` — Formatted rating points.

### Contact
- `POST /api/contact` — Submits contact inquiry. Validates payload via Zod and returns `{ "success": true, "message": "Message sent — Jai Shree Ram" }`.

### Chat / AI Assistant
- `GET /api/chat/prompts` — Quick prompt suggestions.
- `POST /api/chat/ask` — TF-IDF question classification and response generation.

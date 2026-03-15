# ShortLink Implementation Plan

## Goal Description
Build "ShortLink", a web application allowing users to create short, shareable URLs from long links and monitor their performance. The system will feature a React frontend, a Node.js/Express backend, and a MongoDB database, fulfilling the MVP scope (shortening, redirection, user accounts, basic tracking, dashboard).

## User Review Required
> [!IMPORTANT]
> 1. The PRD mentions Redis for caching in the system architecture, but the MVP scope specifically mentions skipping advanced features. For MVP, I plan to handle redirection directly via MongoDB finding the URL, which is still very fast. I can add Redis if you'd like to ensure <100ms latency at high scale right away.
> 2. I'll construct the project in `C:\Users\Admin\.gemini\antigravity\scratch\shortlink`. Do you have a local MongoDB instance running, or should I help set up a MongoDB Atlas cluster URI during implementation?

## Proposed Changes

### 1. Project Setup
- Directory: `C:\Users\Admin\.gemini\antigravity\scratch\shortlink`
- **Backend Component**: Node.js/Express app. Dependencies: `express`, `mongoose`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, and optionally `redis`.
- **Frontend Component**: React app via Vite. Dependencies: `react-router-dom`, `recharts` for analytics, and pure CSS module / styled architecture prioritizing high-end aesthetics (glassmorphism, dark mode).

### 2. Backend Models (MongoDB)
- **User**: `_id`, `email`, `password`, `createdAt`
- **Link**: `_id`, `originalUrl`, `shortCode`, `customAlias`, `userId`, `createdAt`
- **Click**: `_id`, `linkId`, `timestamp`, `country`, `device`, `referrer`

### 3. Backend API Endpoints
- `POST   /api/auth/register` - Create user account
- `POST   /api/auth/login` - Authenticate user
- `POST   /api/links` - Create short link
- `GET    /api/links` - Get current user's links
- `GET    /api/analytics/:linkId` - Fetch total/daily clicks, country, referrer stats
- `GET    /:shortCode` - Redirect to original URL and asynchronously log the click event

### 4. Frontend Pages
- **Landing Page** (`/`): High-conversion design presenting features and an instant shorten demo.
- **Auth** (`/login`, `/register`): Secure authentication flows.
- **Dashboard** (`/dashboard`): Form to enter new long URLs/custom aliases and list previously created links.
- **Analytics Dashboard** (`/analytics/:id`): Visual representation of clicks over time, geographic data, and referrers.

## Verification Plan
### Automated & Manual Testing
1. Verify backend starts and successfully connects to the database.
2. Ensure URL redirection latency is minimal by conducting local latency testing.
3. Visually verify the frontend aesthetics: gradients, animations, modern typography.
4. Test the full integrated flow: Create user -> Create link -> Click link -> View analytics.

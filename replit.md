# ExecutiveAI Pro - Plataforma SaaS de IA para Negócios

## Replit Environment Setup
**Status:** ✅ Fully configured and running (October 19, 2025)
- **Database:** PostgreSQL (Replit-managed) - Connected and schema migrated ✅
  - Database schema pushed successfully using Drizzle ORM
  - All tables created from shared/db-schema.ts
- **Workflow:** Dev Server running on port 5000 ✅
- **Frontend:** React + Vite with HMR configured for Replit proxy ✅
- **Backend:** Express.js server integrated with Vite middleware ✅
- **Deployment:** Configured for VM deployment (build: npm run build, run: npm start) ✅
- **Dependencies:** All npm packages installed (836 packages) ✅
- **Import:** ✅ GitHub import completed and verified (October 19, 2025)
- **Server Entry Point:** server/index.ts (Express with Vite middleware)
- **Port Configuration:** Frontend and integrated server on 0.0.0.0:5000
- **PWA Install Button:** Optimized for mobile - positioned at top-right, compact size (40px height on mobile) ✅
- **API Utilities:** Serverless API utilities in api_serverless/ directory ✅
- **Platform Architecture:** ✅ Desktop and Mobile 100% separated (October 19, 2025)
  - Independent routing for Desktop and Mobile
  - Platform-specific layouts and components
  - Automatic platform detection with usePlatform hook
  - ✅ Direct imports used instead of React.lazy() (workaround for Vite HMR + Suspense bug)
  - ✅ Vite automatic code splitting in production builds ensures optimal bundle sizes
  - ✅ Production-ready with isolated bundles per platform

**Setup Details:**
- Vite configured with `allowedHosts: true` for Replit proxy compatibility
- HMR configured with WSS protocol for Replit environment
- Server binds to 0.0.0.0:5000 (only non-firewalled port)
- Development mode uses mock data (Supabase/Redis/Sentry optional)
- Multi-tenant authentication disabled in dev mode (open access)

**Quick Start:**
1. The application is already running on port 5000
2. Access it via the Webview in Replit
3. Login with default credentials (see below)
4. Optional: Configure integrations via Settings page

**Default Login (Development Mode):**
- Email: admin@empresa.com
- Password: 123456

**Deployment:**
- Type: VM (persistent server)
- Build: `npm run build`
- Run: `npm start`
- Ready to deploy via Replit's Deploy button

**Running in Development Mode:**
The application automatically runs in development mode with:
- Mock data (since Supabase credentials are optional)
- Memory cache (since Redis is optional)
- Web Push API (since Firebase is optional)
- Open access mode (multi-tenant auth can be configured later)

## Overview
ExecutiveAI Pro is a SaaS platform providing businesses with a comprehensive CRM/Management system and a Billing Platform. It offers business analysis, client management, financial tracking, and automation. Key features include an executive dashboard, Google Calendar sync, a Notion-style workspace, secure JWT authentication with multi-tenancy, and Open Banking integration via Pluggy.ai. The platform aims for a zero-credit setup and export for Replit users, ensuring immediate functionality without external services through fallbacks.

## User Preferences
I prefer iterative development, so please ask before making major architectural changes or decisions. I appreciate clear and concise communication. When providing explanations, focus on the "why" behind a decision, not just the "what." I prefer to use direct shell commands for setup rather than relying on automated agent setups in platforms like Replit. Ensure that any credentials or sensitive information are handled securely and configured directly within the application's interface, rather than hardcoding or using platform-specific secret management that might hinder portability. Do not make changes to the `.git` folder or attempt to fix `git index.lock` issues without explicit instructions.

## System Architecture
The platform integrates two core systems:
1.  **ExecutiveAI Pro (CRM/Management):** Features an executive dashboard, Google Calendar synchronization, a Notion-style workspace, and JWT-based multi-tenant authentication.
2.  **Plataforma de Faturamento (Billing Platform):** Integrates with Pluggy.ai for Open Banking, offering financial dashboards, expense analysis, and a dual-write mechanism for attachment uploads.

**Technical Implementations and Design:**
*   **UI/UX:** React-based frontend (`src/`), premium dark theme with consistent dark header backgrounds and the Nexus logo. Implemented as a Progressive Web App (PWA) for installability and offline support.
*   **Platform Architecture:** Professional separation between Desktop and Mobile platforms (`src/platforms/`):
    - **Desktop** (`src/platforms/desktop/`): Desktop-optimized with horizontal header navigation, wide layouts, mouse/keyboard interactions
    - **Mobile** (`src/platforms/mobile/`): Touch-first design with bottom navigation, compact layouts, safe areas for notch devices
    - **Shared** (`src/platforms/shared/`): Common hooks (usePlatform), components, and utilities
    - **PlatformRouter**: Intelligent router that automatically detects platform and renders appropriate app
    - 📚 **[ARQUITETURA_DESKTOP_MOBILE.md](ARQUITETURA_DESKTOP_MOBILE.md)** - Documentação completa da arquitetura Desktop/Mobile
*   **Backend:** Express.js server (`server/`).
*   **Shared Code:** Common utilities and Drizzle schema (`shared/`).
*   **Database ORM:** Drizzle ORM with PostgreSQL (local for billing, Supabase for workspace/CRM/redundancy).
*   **Module Bundler:** Vite for development with HMR configured for Replit.
*   **Security:** AES-256-GCM encryption for credentials, SQL-level `gen_random_uuid()`, Bcrypt password hashing (10 rounds).
*   **Multi-tenant Authentication:** Express-session based with centralized login via Supabase Owner for data isolation.
*   **Onboarding:** Interactive tour system using `react-joyride` with dark/gold styling.
*   **Dual-Write Architecture:** Ensures data redundancy for attachments by saving to both local PostgreSQL and Supabase.
*   **Performance Optimizations:** Distributed Redis caching with memory fallback, API rate limiting, DDoS protection middleware, and an asynchronous background job queue system.
*   **Monitoring & Observability:** Real-time error tracking with Sentry, transactional email delivery via Resend, CDN and DDoS protection via Cloudflare, and centralized logging and uptime monitoring via Better Stack/Logtail.
*   **Notification System:** Comprehensive push notification system with Web Push API (primary) and Firebase Cloud Messaging (optional), monitoring Supabase, Google Calendar, and Pluggy.ai events.

## External Dependencies
*   **PostgreSQL:** Primary database.
*   **Supabase:** External PostgreSQL for CRM and redundant storage.
*   **Pluggy.ai:** Open Banking API.
*   **Google Calendar API:** Event synchronization.
*   **Upstash Redis:** Distributed caching.
*   **Sentry:** Error tracking.
*   **Resend:** Transactional email.
*   **Cloudflare:** CDN and DDoS protection.
*   **Better Stack/Logtail:** Centralized logging and uptime monitoring.
*   **N8N Webhook:** Optional automation workflows.
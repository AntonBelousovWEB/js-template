# Frontend Starter

React + Vite starter with SSR, route auto-discovery, request-scoped DI, Reatom state, Mantine UI, and a removable example module.

## Scripts

- `npm run dev` - SSR dev server.
- `npm run dev:spa` - plain Vite SPA mode.
- `npm run build` - typecheck, client build, and SSR build.
- `npm run preview` - production SSR preview from `dist`.
- `npm run test:run` - run Vitest once.
- `npm run test:e2e` - run Playwright SSR/hydration smoke tests (headless).
- `npm run test:e2e:ui` - run Playwright tests with UI mode.
- `npm run lint` - run ESLint.
- `npm run template:reset` - remove the demo entity/feature module and leave a clean `HomePage`.

## Architecture

- `src/app` - providers, DI container, router, SSR-safe app setup.
- `src/pages` - auto-discovered route pages.
- `src/features` - user-facing use cases composed by pages.
- `src/entities` - domain models, repositories, services, stores, and entity UI.
- `src/shared` - infrastructure primitives such as API, storage, routes, and React helpers.
- `src/widgets` - layout-level UI blocks.

## Testing

### Unit / integration — Vitest

Tests live in `__tests__/` directories next to source files. Vitest reads config from `vite.config.ts`. Mock dependencies via the DI container's `createChild()` + `bindAll({ useValue: mock })`.

### E2E smoke — Playwright

`e2e/__tests__/ssr-smoke.test.ts` verifies:
- Server-side rendering delivers content (HTML before JS)
- Hydration completes without runtime errors
- User interactions work after hydration

Playwright config at `playwright.config.ts`. Targets Chromium. Builds and starts the production preview server automatically.

### API mocking — MSW

Handlers are co-located with their domain: each entity/feature exports its own `xxxHandlers` array from a `mocks/handlers.ts` file. The central barrel at `src/shared/api/mocks/handlers.ts` just spreads them into one flat array — no giant file, no merge conflicts.

To activate:

1. Define handlers in the relevant module:

```ts
// src/entities/user/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const userHandlers: HttpHandler[] = [
  http.get('/api/users', () => HttpResponse.json([...])),
]
```

2. Spread them into the central barrel:

```ts
// src/shared/api/mocks/handlers.ts
import { templateModuleHandlers } from '@/entities/templateModule/mocks/handlers'
import { userHandlers } from '@/entities/user/mocks/handlers'

export const handlers: HttpHandler[] = [
  ...templateModuleHandlers,
  ...userHandlers,
]
```

3. Uncomment `test.setupFiles` in `vite.config.ts`.

4. Override per-test with `server.use(...)` when needed.

# Frontend Starter

React + Vite starter with SSR, route auto-discovery, request-scoped DI, Reatom state, Mantine UI, and a removable example module.

## Scripts

- `npm run dev` - SSR dev server.
- `npm run dev:spa` - plain Vite SPA mode.
- `npm run build` - typecheck, client build, and SSR build.
- `npm run preview` - production SSR preview from `dist`.
- `npm run test:run` - run Vitest once.
- `npm run lint` - run ESLint.
- `npm run template:reset` - remove the demo entity/feature module and leave a clean `HomePage`.

## Architecture

- `src/app` - providers, DI container, router, SSR-safe app setup.
- `src/pages` - auto-discovered route pages.
- `src/features` - user-facing use cases composed by pages.
- `src/entities` - domain models, repositories, services, stores, and entity UI.
- `src/shared` - infrastructure primitives such as API, storage, routes, and React helpers.
- `src/widgets` - layout-level UI blocks.

## Next Professional Steps

- Add Playwright for SSR/hydration smoke tests.
- Add MSW when real API contracts appear.
- Add Storybook or Ladle for feature/entity UI review.
- Add Changesets if this template becomes a versioned internal package.
- Add typed env validation with `zod` or `valibot`.

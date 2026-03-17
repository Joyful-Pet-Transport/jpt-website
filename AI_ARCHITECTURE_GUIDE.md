# AI Architecture & Development Guide (JPT Website)

This document is a **working contract for AI coding agents** (Cursor, Windsurf, Copilot, Codex, etc.) and new engineers.

Use it to understand how this app is structured, how features should be implemented, and which patterns should be preserved for consistency.

---

## 1) High-level architecture

- **Frontend**: Next.js App Router (`app/`) with React + TypeScript.
- **Backend + data layer**: Convex (`convex/`) for schema, queries, mutations, actions, and file storage.
- **Auth**: `@convex-dev/auth` with Google provider.
- **Styling**: Tailwind CSS + shared UI primitives + reusable custom components.

### Runtime composition

1. `app/layout.tsx` wraps app in `ConvexAuthNextjsServerProvider` and `ClientLayout`.
2. `ClientLayout` mounts the client-side provider tree from `utils/providers/Providers.tsx`.
3. Providers compose app-wide dependencies in this order:
   - `ConvexClientProvider`
   - `AuthUserProvider`
   - `LoaderProvider`
   - `ModalProvider`

Preserve this order unless there is a strong architectural reason to change it.

---

## 2) Folder roles and boundaries

## `app/`
- Route entrypoints and route-specific layouts.
- Prefer lightweight screen composition here; avoid burying business logic in page files.
- Dashboard auth gating is done at layout-level (`app/dashboard/layout.tsx`).

## `components/`
- Shared UI and feature components.
- Existing intent by subfolder:
  - `sections/`: homepage/landing sections.
  - `contents/`: grouped content blocks.
  - `containers/`: structural wrappers and spacing/layout primitives.
  - `elements/`: lower-level reusable elements (text, buttons, inputs, modal, table).
  - `forms/`: multi-step form flows and submit logic.
  - `schemas/`: zod validation schemas, paired to forms.
  - `layouts/`: app shells (navbar/sidebar/dashboard/client layout).
  - `ui/`: shadcn-style or utility UI components.

## `utils/`
- App-level glue (providers, contexts, hooks, config constants).
- Good place for cross-cutting logic used by many components.

## `convex/`
- Server-side data model + functions.
- Current organization:
  - `schema.ts`: canonical table definitions + indexes.
  - `tables/*`: mostly query/read model and actions.
  - `mutations/*`: write operations.
  - `auth.ts`: auth configuration and user-role bootstrapping.
  - `cron.ts`: scheduled/manual trigger actions.

## `models/`
- Shared TS model interfaces used by UI/config.

## `initialData/`
- JSONL seed/import files for Convex tables.

---

## 3) Core coding patterns to preserve

## 3.1 Import and naming conventions

- Prefer absolute imports with `@/` path alias.
- Components are generally `PascalCase` files/exports.
- Hooks are `useX` and return focused behavior/context.
- Keep feature names aligned across layers:
  - form schema
  - form component
  - convex mutation/query
  - table name in schema

## 3.2 “Base + Form wrapper” input pattern

The codebase uses a repeatable pattern for form inputs:

- `*Base` component handles presentational input behavior (label, validation text, styles).
- `*FormInput` wraps the base with `react-hook-form` `Controller`.

Examples:
- `InputBase` + `FormInput`
- `SelectBase` + `SelectFormInput`
- Similar structure across other input types.

When creating a new input type, follow this split:
1. Build a reusable controlled `Base` component.
2. Add a thin RHF adapter wrapper.
3. Keep validation message rendering in base component for consistent UX.

## 3.3 Form flow pattern (multi-step booking)

Forms are intentionally structured in layers:

1. **Schema** (Zod) in `components/schemas/*`.
2. **Form state** via `useForm` + `zodResolver`.
3. **Step components** for multi-step UI.
4. **Submit orchestration** in one handler that may:
   - upload files via Convex storage URL,
   - create child records,
   - then create main booking record,
   - then show modal + redirect.

When adding/changing form behavior, update schema first, then form default values, then UI.

## 3.4 Providers + context usage

- Access provider state through custom hooks (`useModal`, `useGetCurrentUser`, etc.).
- Hooks should throw explicit errors if used outside provider context.
- Keep provider responsibilities narrow:
  - auth user hydration in auth provider,
  - modal rendering and visibility in modal provider,
  - loading status in loader provider.

## 3.5 Layout + responsiveness

- The app uses wrapper containers (`PageWrapperContainer`, `BoxedContainer`, `FormContainer`) to enforce consistent spacing, width, and background patterns.
- Prefer reusing container components over ad-hoc page-level spacing.
- Existing responsive logic uses `useResponsive` / `useIsMobile` / `useIsTablet` hooks. Keep breakpoints consistent with current behavior unless intentionally refactoring globally.

## 3.6 Styling consistency

- Prefer Tailwind utility classes with composition helpers (`cn` from `lib/utils.ts`) where useful.
- Reuse shared typography components (`Heading`, `BodyText`) and action components (`DynamicButton`) before introducing custom one-offs.
- Keep labels/CTAs in the existing visual tone (uppercase where already used in core components).

## 3.7 Convex data layer pattern

- Schema is the source of truth (`convex/schema.ts`).
- Add indexes in schema when introducing query patterns that need them.
- Queries (`convex/tables/*`) should shape data for UI use (e.g., resolving storage IDs to URLs).
- Mutations (`convex/mutations/*`) should perform writes and related side effects (e.g., insert booking status row).

## 3.8 Auth + authorization

- User role assignment is centralized in Convex auth callback.
- Route access is enforced in client dashboard layout by checking current user role and auth token.
- Keep role slugs stable (`customer`, `staff`, `admin`) and avoid hardcoding alternate labels in many places.

---

## 4) How to implement new features (recommended workflow)

1. **Define data changes first**
   - Update `convex/schema.ts`.
   - Add or update `convex/tables/*` queries.
   - Add or update `convex/mutations/*` writes.

2. **Regenerate Convex API types if needed**
   - Use Convex dev workflow so generated API types stay in sync.

3. **Build/extend form schema**
   - Add/update Zod schema in `components/schemas/*`.

4. **Implement UI with existing primitives**
   - Use containers + text/button/input primitives first.
   - Keep page files as composition layers.

5. **Integrate data hooks**
   - Use `useQuery` for reads and `useMutation` for writes.
   - Keep submit handlers explicit and traceable.

6. **Guard access and UX states**
   - Respect auth role checks for dashboard/admin features.
   - Handle loading/error states explicitly.

7. **Consistency pass**
   - Ensure naming, spacing, and control patterns align with nearby code.

---

## 5) Guardrails for AI assistants

## Do
- Reuse existing components/containers/hooks before creating new abstractions.
- Keep code close to current project style (TypeScript strictness, named props, hook-driven logic).
- Prefer small, composable changes over broad rewrites.
- Preserve current route and provider architecture.

## Avoid
- Introducing a second pattern when a first-class pattern already exists (especially inputs/forms).
- Moving business logic into presentational components.
- Bypassing schemas for form validation.
- Creating role logic scattered across many files.
- Replacing consistent container spacing with one-off layout hacks.

---

## 6) Quick orientation checklist for newcomers

- Read `app/layout.tsx` and `utils/providers/Providers.tsx` first.
- Read `convex/schema.ts` to understand the domain model.
- Trace one end-to-end flow:
  - `components/forms/InternationalPetTransportForm.tsx`
  - `components/schemas/international-pet-relocation-schema.ts`
  - `convex/mutations/international_pet_transport.ts`
  - related `convex/tables/*` queries used by screens.
- Read dashboard access control in `app/dashboard/layout.tsx`.
- Check `utils/config/navItems.ts` for top-level navigation IA.

---

## 7) Suggested future improvements (safe refactor targets)

- Add a dedicated `docs/` index and move architecture/dev conventions there.
- Consolidate naming and typing for mutation handler context arguments (some files use `ctx`, some use custom names).
- Standardize typed `FormValues` for RHF forms to reduce `any` usage.
- Introduce lightweight ADRs for major architecture changes.

---

If you are an AI IDE assistant, follow this guide as the default unless a direct task instruction explicitly overrides it.

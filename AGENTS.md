# AGENTS.md

Scope: entire repository.

## Default behavior (all AI agents)
- Treat `AI_ARCHITECTURE_GUIDE.md` as the default implementation contract for architecture, patterns, and coding conventions.
- Before coding, review the relevant sections of `AI_ARCHITECTURE_GUIDE.md` and follow existing repository patterns over introducing new abstractions.
- Prefer extending existing components, hooks, providers, form patterns, and Convex data conventions described in the guide.

## Required consistency checks
- Keep `app/` files focused on route composition.
- Keep business/data write logic in Convex mutations/actions.
- Keep form validation in Zod schemas under `components/schemas/`.
- Reuse shared primitives (`containers`, `elements`, `utils/hooks`, `utils/providers`) before adding new patterns.

## If uncertain
- Match nearby code style and choose the smallest consistent change.
- Add/update docs when introducing a new architectural pattern.

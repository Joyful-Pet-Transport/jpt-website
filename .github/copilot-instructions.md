# Copilot Instructions

When proposing or generating code in this repository, treat `AI_ARCHITECTURE_GUIDE.md` as the primary architecture and implementation guide.

## Expectations
- Follow existing patterns for providers, hooks, forms, components, layouts, and Convex data access.
- Keep page files in `app/` as composition layers.
- Prefer existing UI primitives and containers over one-off custom patterns.
- Keep form validation in Zod schemas and form orchestration in form components.
- Keep data model/query/mutation changes aligned with `convex/schema.ts` conventions.

If there is a conflict, follow explicit user/developer instructions first, then this file, then the architecture guide.

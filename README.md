## AI-Assisted Development

This project is built using [OpenCode](https://opencode.ai) as an AI coding
agent, with project-specific rules and context defined in `AGENTS.md`. This
isn't just AI-generated code — every architectural decision is reviewed,
challenged, and iterated on before implementation.

**Examples of decisions made through this process:**

- **Multi-tenant isolation:** enforced a non-negotiable rule that `gymId`
  must always come from the authenticated JWT, never from a client-supplied
  parameter, across every tenant-aware service and query.
- **Scoped RAG to actual needs:** the agent initially proposed `pgvector`
  for the knowledge base. Given the small size of the corpus (FAQ + exercise
  technique docs), this was redirected to a simpler prompt-stuffing approach —
  right-sized for the problem instead of over-engineered.
- **Deferred cross-domain refresh tokens:** identified that HttpOnly cookie
  refresh tokens across separate Vercel/Railway domains would introduce
  CORS complexity disproportionate to a v1 MVP; deferred to a later phase
  in favor of a simpler JWT-only flow.
- **Caught a tenant-isolation edge case:** reviewed the generated Prisma
  schema and flagged that a user whose gym is deleted (`gymId = null`)
  would be structurally indistinguishable from a `SUPERADMIN` — required
  explicit role-based handling in the `TenantGuard`, not just a null check.
- **Dependency security:** migrated the project from npm to pnpm and
  enforced `ignore-scripts=true`, in response to real 2025-2026 npm
  supply-chain attacks that exploit install-time lifecycle scripts.

This workflow — clear instructions, explicit non-negotiable rules, and
active review of AI-generated output before merging — is documented in
`AGENTS.md` and reflected in the commit history.

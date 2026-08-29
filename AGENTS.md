<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# GYMWEB — Contexto del proyecto y reglas del agente

## Resumen
SaaS multi-tenant para gimnasios. Cada gimnasio (Gym) es un tenant aislado.
El dueño/entrenador asigna rutinas manualmente a sus clientes — la IA NUNCA
genera ni asigna rutinas. Los clientes marcan ejercicios completados.

## Estructura del repo (monorepo)
- `frontend/` — Next.js 16, React 18, TypeScript, Tailwind (mobile-first,
  tema oscuro, acento verde neón #CCFF00)
- `backend/` — NestJS + Prisma + PostgreSQL (Neon)

## Gestor de paquetes
Este proyecto usa **pnpm**, nunca npm ni yarn. Todos los comandos deben
ser `pnpm add` / `pnpm install`.

Además, la política de CI/CD debe forzar `pnpm` y prohibir `npm install`
y `yarn install` para prevenir regresiones en el entorno de desarrollo.

## Seguridad de dependencias
- Prioriza paquetes oficiales del ecosistema (NestJS, Next.js, Prisma)
  sobre alternativas de terceros poco mantenidas.
- Evita paquetes con pocas descargas semanales o sin actividad reciente.
- `.npmrc` debe mantener `ignore-scripts=true` para mantener un cierre de
  seguridad explícito y evitar ejecución automática de scripts de terceros.
- En CI/CD o despliegues, cualquier generación de Prisma u otros scripts
  requeridos se debe ejecutar explícitamente, por ejemplo `pnpm prisma generate`.
- Tras instalar dependencias nuevas, corre `pnpm audit` y reporta
  vulnerabilidades altas/críticas antes de continuar.

## Entorno (Windows/PowerShell)
El shell es PowerShell, no Bash. NUNCA uses `&&` para encadenar comandos.
Usa `;` o `if ($?) { ... }`.

## Prisma
Versión fijada: `prisma@5.22.0` y `@prisma/client@5.22.0`. No actualices
a una versión mayor sin confirmar conmigo primero.

## Reglas no negociables del modelo multi-tenant
- El `gymId` SIEMPRE se obtiene del JWT autenticado, nunca de un
  parámetro enviado por el cliente.
- Todo servicio tenant-aware recibe `gymId` como parámetro obligatorio
  y filtra con `WHERE gym_id = :gymId`.
- Nunca expongas `findById(id)` sin `gymId` para entidades tenant-aware.
- TenantGuard: si `role !== SUPERADMIN` y `gymId` es null, rechazar con
  403 (evita usuarios huérfanos ambiguos tras borrar un gym).
- Antes de completar un endpoint, valida que todas las relaciones
  (rutina, asignación, ejercicio) pertenezcan al mismo gymId.

## Decisiones ya tomadas (no las reabras sin preguntarme)
- Sin refresh token en cookie HttpOnly todavía — JWT simple (~2h) para v1.
  Esto implica una UX de re-login más frecuente y una necesidad explícita de
  manejar expiración, logout y reautenticación con claridad. Cuando se implemente
  el refresh token, hacerlo con política de rotación y revocación.
- Sin flujo de invitación por código — el dueño crea clientes manualmente.
- Sin pgvector para RAG — corpus pequeño, se pasa completo en el prompt.
- La IA solo redacta insights a partir de métricas YA calculadas
  determinísticamente — nunca calcula ni inventa números.

## Commits
Conventional Commits (feat:, fix:, chore:, docs:, refactor:, test:),
atómicos, uno por unidad lógica. Nunca un commit gigante mezclando todo.

## Al terminar una tarea
Corre build/tests, muéstrame el resultado, y haz los commits — no
esperes a que te lo pida cada vez si ya todo pasó.
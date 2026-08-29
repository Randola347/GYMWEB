# GYMWEB

SaaS multi-tenant para gimnasios con frontend Next.js y backend NestJS + Prisma + PostgreSQL.

## Stack
- Frontend: Next.js 16, React 18, TypeScript, Tailwind
- Backend: NestJS, Prisma, PostgreSQL (Neon)
- Package manager: pnpm

## Requisitos
- Node.js 20+
- pnpm 9+

## Instalación
```powershell
# desde la raíz del repo
pnpm install

# backend
cd backend
pnpm install
```

## Reglas del proyecto
- Usar `pnpm` exclusivamente. No `npm install` ni `yarn install`.
- El archivo `.npmrc` mantiene `ignore-scripts=true` para evitar ejecución automática de scripts de terceros.
- Cuando el proyecto necesite generar artefactos como Prisma Client, hacerlo explícitamente en CI/CD o durante la shell manual, por ejemplo:
```powershell
cd backend
pnpm prisma generate
```

## Seguridad de tokens
- La versión actual usa JWT de acceso con expiración corta (~2 horas).
- El refresh token HttpOnly se dejará para una fase posterior, cuando el producto requiera menos reautenticación.
- La expiración corta debe manejarse con re-login claro y con política de logout consistente.

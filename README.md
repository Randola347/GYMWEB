# GYMWEB

GYMWEB es una SaaS multi-tenant para gimnasios pensada para gestionar clientes, rutinas, progreso y operaciones del entrenador desde una sola base de negocio.

El proyecto combina un frontend mobile-first con un backend NestJS + Prisma + PostgreSQL, con un enfoque claro en aislamiento por gimnasio y administración de usuarios por tenant.

## Demo

- Frontend mock inicial en Next.js
- Backend NestJS en desarrollo
- Arquitectura preparada para migración real a producción y despliegue por gimnasio

## Problema que resuelve

La mayoría de gimnasios tienen un problema común: toda la operación termina fragmentada entre WhatsApp, hojas de cálculo, recordatorios manuales y herramientas no integradas.

GYMWEB busca centralizar:
- la administración de clientes por gimnasio
- la asignación manual de rutinas por entrenador
- el seguimiento del progreso por ejercicio
- la base de datos estructurada para crecer con IA y reporting

## Stack

- Frontend: Next.js 16, React 18, TypeScript, Tailwind CSS
- Backend: NestJS, Prisma, PostgreSQL (Neon)
- Package manager: pnpm
- Seguridad: JWT de acceso para autenticación con aislamiento por tenant

## Arquitectura

```text
Frontend (Next.js)
    └── consume API REST del backend

Backend (NestJS)
    ├── Auth / JWT
    ├── Gyms
    ├── Users
    ├── Routines
    ├── RoutineAssignments
    └── ExerciseCompletions

Database (PostgreSQL / Prisma)
    └── aislamiento por gym_id en cada entidad tenant-aware
```

## Funcionalidades principales

- Multi-tenant por gimnasio
- Aislamiento explícito de datos por `gym_id`
- Usuarios con roles: `SUPERADMIN`, `OWNER`, `TRAINER`, `CLIENT`
- Rutinas creadas por el entrenador/owner
- Asignación manual de rutinas a clientes
- Registro de ejercicios completados por fecha
- Base preparada para IA del cliente y insights del entrenador en fases posteriores

## Estado del proyecto

Actualmente el proyecto está en la fase de backend real y arquitectura multi-tenant.

- Fase 1 completada: NestJS + Prisma + schema base + autenticación preparada
- Fase 2: conexión del frontend a la API real
- Fase 3: IA para cliente con contexto de su rutina y FAQ
- Fase 4: insights automáticos para entrenadores

## Portafolio / valor del proyecto

Este proyecto está pensado como una demostración de arquitectura SaaS realista para un cliente con varios gimnasios, no solo como una landing page o mock visual.

Incluye decisiones reales de producto y backend como:
- aislamiento multi-tenant
- datos estructurados por entidad
- autenticación segura
- separación entre coach y cliente
- escalabilidad para más módulos en el futuro

## Local development

> Esta sección es opcional y está pensada para desarrolladores o evaluadores técnicos.

```powershell
# raíz del repo
pnpm install

# backend
cd backend
pnpm install
pnpm prisma generate
pnpm run build
```

## Notas técnicas relevantes

- Se usa `pnpm` como gestor de paquetes principal.
- El backend está preparado para PostgreSQL y Prisma.
- La autenticación usa JWT de acceso con expiración corta por diseño en la v1.
- El multi-tenant se resuelve por `gym_id` del usuario autenticado y no por parámetros del cliente.

## Objetivo de carrera

Este proyecto refleja mi enfoque en arquitectura backend, diseño de sistemas escalables y product thinking aplicado a SaaS. Es una base sólida para seguir creciendo en:
- NestJS
- Prisma + PostgreSQL
- autenticación y seguridad
- diseño de sistemas multi-tenant
- IA aplicada a productos reales


# GYMWEB

GYMWEB es un MVP de SaaS multi-tenant para gimnasios, pensado para ayudar a entrenadores y dueños a gestionar rutinas, clientes y progreso sin depender de procesos manuales dispersos.

El proyecto combina un frontend mobile-first con un backend NestJS + Prisma, diseñado para escalar a varios gimnasios bajo la misma plataforma sin mezclar datos entre tenants.

## Demo

- Frontend mock inicial: mobile-first, dark theme, UX enfocada en clientes y entrenadores
- Backend en desarrollo: autenticación JWT, aislamiento multi-tenant y base de datos PostgreSQL/Neon
- Estado actual: arquitectura de backend y modelo de datos en construcción

## Problema que resuelve

Cada gimnasio tiene su propio conjunto de clientes, rutinas, asignaciones y progresos. En un sistema real, eso no puede depender de datos compartidos ni de estados locales del frontend.

GYMWEB está diseñado para:
- separar cada gimnasio como tenant aislado
- permitir que el dueño o entrenador asigne rutinas manualmente
- registrar ejercicios completados por cada cliente
- preparar la base para IA orientada al cliente y al entrenador en fases futuras

## Stack

- Frontend: Next.js 16, React 18, TypeScript, Tailwind CSS
- Backend: NestJS, Prisma, PostgreSQL
- Database: Neon (PostgreSQL)
- Package manager: pnpm

## Arquitectura

```text
Frontend (Next.js)
       |
       v
Backend (NestJS)
       |
       +--> Prisma ORM
       |
       +--> PostgreSQL / Neon

Cada entidad tenant-aware incluye gymId y se filtra por tenant autenticado.
```

## Funcionalidades principales

- Multi-tenant por gimnasio
- Autenticación JWT real
- Usuarios con roles: OWNER, TRAINER, CLIENT, SUPERADMIN
- Rutinas por gimnasio
- Asignación manual de rutinas a clientes
- Registro de completados por ejercicio
- Base preparada para IA orientada a cliente y analítica para entrenadores

## Roadmap

### Fase 1: Backend real
- NestJS + Prisma + PostgreSQL
- modelo multi-tenant con gyms, users, routines, routine_exercises, routine_assignments y exercise_completions
- JWT y guard de aislamiento por tenant
- superadmin para crear gimnasios

### Fase 2: Frontend conectado a API real
- reemplazar mocks por datos reales
- persistencia de rutinas y completados
- panel de asignación para entrenadores

### Fase 3: IA para cliente
- chat con contexto de su rutina actual
- RAG sobre FAQ y técnica de ejercicios

### Fase 4: Insights para entrenador
- resumen semanal con patrones de progreso y seguimiento

## Estado del proyecto

Este proyecto está enfocado en construir una base SaaS robusta y profesional, con énfasis en arquitectura, seguridad y aislamiento de datos antes de añadir funcionalidades más “bonitas” visualmente.

## Instalación local (opcional)

```powershell
# instalar dependencias del frontend
pnpm install

# instalar dependencias del backend
cd backend
pnpm install
```

Si necesitas generar el cliente de Prisma:

```powershell
cd backend
pnpm prisma generate
```

## Notas de diseño

- Se usa pnpm como gestor de paquetes
- La autenticación sigue la estrategia JWT de acceso con corta expiración para la v1
- El aislamiento multi-tenant se hace por `gymId` del usuario autenticado, nunca por un parámetro arbitrario del cliente
- El backend prepara la base para crecer sin comprometer la seguridad ni la integridad del negocio

## Contacto

- GitHub: https://github.com/Randola347
- Proyecto: GYMWEB


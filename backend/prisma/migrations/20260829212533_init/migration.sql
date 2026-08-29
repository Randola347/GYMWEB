-- CreateEnum
CREATE TYPE "GymStatus" AS ENUM ('ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERADMIN', 'OWNER', 'TRAINER', 'CLIENT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INVITED', 'DISABLED');

-- CreateEnum
CREATE TYPE "RoutineAssignmentStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED');

-- CreateTable
CREATE TABLE "gyms" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "GymStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "gymId" UUID,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routines" (
    "id" UUID NOT NULL,
    "gymId" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "daysPerWeek" INTEGER,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "routines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routine_exercises" (
    "id" UUID NOT NULL,
    "routineId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dayNumber" INTEGER NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "sets" INTEGER,
    "repetitions" INTEGER,
    "durationSec" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "routine_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routine_assignments" (
    "id" UUID NOT NULL,
    "gymId" UUID NOT NULL,
    "routineId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "assignedById" UUID NOT NULL,
    "startsOn" DATE NOT NULL,
    "endsOn" DATE,
    "status" "RoutineAssignmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "routine_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_completions" (
    "id" UUID NOT NULL,
    "gymId" UUID NOT NULL,
    "assignmentId" UUID NOT NULL,
    "routineExerciseId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "completedOn" DATE NOT NULL,
    "completedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_completions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gyms_slug_key" ON "gyms"("slug");

-- CreateIndex
CREATE INDEX "users_gymId_role_idx" ON "users"("gymId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "users_gymId_email_key" ON "users"("gymId", "email");

-- CreateIndex
CREATE INDEX "routines_gymId_createdById_idx" ON "routines"("gymId", "createdById");

-- CreateIndex
CREATE INDEX "routine_exercises_routineId_dayNumber_orderIndex_idx" ON "routine_exercises"("routineId", "dayNumber", "orderIndex");

-- CreateIndex
CREATE INDEX "routine_assignments_gymId_clientId_idx" ON "routine_assignments"("gymId", "clientId");

-- CreateIndex
CREATE INDEX "routine_assignments_gymId_routineId_idx" ON "routine_assignments"("gymId", "routineId");

-- CreateIndex
CREATE INDEX "exercise_completions_gymId_clientId_completedOn_idx" ON "exercise_completions"("gymId", "clientId", "completedOn");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_completions_assignmentId_routineExerciseId_complet_key" ON "exercise_completions"("assignmentId", "routineExerciseId", "completedOn");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routines" ADD CONSTRAINT "routines_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_exercises" ADD CONSTRAINT "routine_exercises_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_assignments" ADD CONSTRAINT "routine_assignments_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_assignments" ADD CONSTRAINT "routine_assignments_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_assignments" ADD CONSTRAINT "routine_assignments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_assignments" ADD CONSTRAINT "routine_assignments_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_completions" ADD CONSTRAINT "exercise_completions_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_completions" ADD CONSTRAINT "exercise_completions_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "routine_assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_completions" ADD CONSTRAINT "exercise_completions_routineExerciseId_fkey" FOREIGN KEY ("routineExerciseId") REFERENCES "routine_exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_completions" ADD CONSTRAINT "exercise_completions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

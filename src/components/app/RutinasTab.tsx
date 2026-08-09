"use client";

import { useState } from "react";
import { Timer, Flame } from "lucide-react";

type Day = "Lun" | "Mar" | "Mié" | "Jue" | "Vie" | "Sáb";

interface Exercise {
  id: number;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  rest: string;
  completed: boolean;
}

interface DayRoutine {
  label: string;
  theme: string;
  exercises: Exercise[];
}

const routines: Record<Day, DayRoutine> = {
  Lun: {
    label: "Pecho + Tríceps",
    theme: "💪",
    exercises: [
      { id: 1, name: "Press de Banca", muscle: "Pecho", sets: 4, reps: "10-12", rest: "90s", completed: false },
      { id: 2, name: "Aperturas con Mancuerna", muscle: "Pecho", sets: 3, reps: "12-15", rest: "60s", completed: false },
      { id: 3, name: "Press Inclinado", muscle: "Pecho Superior", sets: 3, reps: "10-12", rest: "75s", completed: false },
      { id: 4, name: "Fondos en Paralelas", muscle: "Tríceps", sets: 3, reps: "12", rest: "60s", completed: false },
      { id: 5, name: "Extensión de Tríceps", muscle: "Tríceps", sets: 3, reps: "15", rest: "45s", completed: false },
    ],
  },
  Mar: {
    label: "Espalda + Bíceps",
    theme: "🔙",
    exercises: [
      { id: 6, name: "Peso Muerto", muscle: "Espalda Baja", sets: 4, reps: "8", rest: "120s", completed: false },
      { id: 7, name: "Dominadas", muscle: "Dorsal", sets: 4, reps: "Max", rest: "90s", completed: false },
      { id: 8, name: "Remo con Barra", muscle: "Dorsal", sets: 3, reps: "10-12", rest: "75s", completed: false },
      { id: 9, name: "Curl de Bíceps", muscle: "Bíceps", sets: 3, reps: "12", rest: "60s", completed: false },
      { id: 10, name: "Curl Martillo", muscle: "Bíceps", sets: 3, reps: "15", rest: "45s", completed: false },
    ],
  },
  Mié: {
    label: "Piernas + Glúteos",
    theme: "🦵",
    exercises: [
      { id: 11, name: "Sentadilla con Barra", muscle: "Cuádriceps", sets: 4, reps: "10", rest: "120s", completed: false },
      { id: 12, name: "Prensa de Piernas", muscle: "Cuádriceps", sets: 3, reps: "12-15", rest: "90s", completed: false },
      { id: 13, name: "Extensiones de Cuádriceps", muscle: "Cuádriceps", sets: 3, reps: "15", rest: "60s", completed: false },
      { id: 14, name: "Peso Muerto Rumano", muscle: "Isquiotibiales", sets: 3, reps: "12", rest: "75s", completed: false },
      { id: 15, name: "Hip Thrust", muscle: "Glúteos", sets: 4, reps: "15", rest: "75s", completed: false },
    ],
  },
  Jue: {
    label: "Hombros + Core",
    theme: "🏋️",
    exercises: [
      { id: 16, name: "Press Militar", muscle: "Deltoides", sets: 4, reps: "10", rest: "90s", completed: false },
      { id: 17, name: "Elevaciones Laterales", muscle: "Deltoides Lateral", sets: 3, reps: "15", rest: "60s", completed: false },
      { id: 18, name: "Face Pulls", muscle: "Deltoides Posterior", sets: 3, reps: "15", rest: "60s", completed: false },
      { id: 19, name: "Plancha", muscle: "Core", sets: 3, reps: "60s", rest: "45s", completed: false },
      { id: 20, name: "Crunches con Peso", muscle: "Abdomen", sets: 3, reps: "20", rest: "45s", completed: false },
    ],
  },
  Vie: {
    label: "Full Body Power",
    theme: "⚡",
    exercises: [
      { id: 21, name: "Clean & Press", muscle: "Full Body", sets: 4, reps: "6", rest: "120s", completed: false },
      { id: 22, name: "Sentadilla Frontal", muscle: "Cuádriceps", sets: 3, reps: "8", rest: "90s", completed: false },
      { id: 23, name: "Remo Pendlay", muscle: "Espalda", sets: 3, reps: "8", rest: "90s", completed: false },
      { id: 24, name: "Dips Ponderados", muscle: "Tríceps/Pecho", sets: 3, reps: "10", rest: "75s", completed: false },
      { id: 25, name: "Curl Bíceps Barra", muscle: "Bíceps", sets: 3, reps: "12", rest: "60s", completed: false },
    ],
  },
  Sáb: {
    label: "Cardio + Movilidad",
    theme: "🏃",
    exercises: [
      { id: 26, name: "HIIT en Cinta", muscle: "Cardio", sets: 1, reps: "20 min", rest: "-", completed: false },
      { id: 27, name: "Bicicleta Estática", muscle: "Cardio", sets: 1, reps: "15 min", rest: "-", completed: false },
      { id: 28, name: "Estiramientos Globales", muscle: "Movilidad", sets: 1, reps: "10 min", rest: "-", completed: false },
      { id: 29, name: "Foam Rolling", muscle: "Recuperación", sets: 1, reps: "10 min", rest: "-", completed: false },
    ],
  },
};

const days: Day[] = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function RutinasTab() {
  const [selectedDay, setSelectedDay] = useState<Day>("Lun");
  const [exercises, setExercises] = useState<Record<Day, Exercise[]>>(
    Object.fromEntries(
      Object.entries(routines).map(([day, routine]) => [day, routine.exercises])
    ) as Record<Day, Exercise[]>
  );

  const toggleExercise = (id: number) => {
    setExercises((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay].map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      ),
    }));
  };

  const currentExercises = exercises[selectedDay];
  const completedCount = currentExercises.filter((e) => e.completed).length;
  const totalCount = currentExercises.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="px-5 pt-14 pb-4 flex-shrink-0"
        style={{
          background: "rgba(9,9,11,0.95)",
          borderBottom: "1px solid rgba(39,39,42,0.5)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              className="text-xl font-black text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              Mis Rutinas
            </h2>
            <p className="text-zinc-500 text-xs mt-0.5 flex items-center gap-1">
              <Flame size={12} style={{ color: "#CCFF00" }} />
              {routines[selectedDay].theme} {routines[selectedDay].label}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-xl"
            style={{
              background: "rgba(204,255,0,0.1)",
              border: "1px solid rgba(204,255,0,0.2)",
            }}
          >
            <span className="text-xs font-bold" style={{ color: "#CCFF00" }}>
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "#CCFF00",
              boxShadow: progress > 0 ? "0 0 8px rgba(204,255,0,0.6)" : "none",
            }}
          />
        </div>

        {/* Day selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {days.map((day) => {
            const isActive = selectedDay === day;
            const dayExercises = exercises[day];
            const dayCompleted = dayExercises.filter((e) => e.completed).length;
            const dayTotal = dayExercises.length;
            const allDone = dayCompleted === dayTotal && dayTotal > 0;

            return (
              <button
                key={day}
                id={`day-${day}`}
                onClick={() => setSelectedDay(day)}
                className="flex flex-col items-center gap-0.5 flex-shrink-0 w-12 py-2.5 rounded-xl transition-all duration-200 active:scale-90"
                style={
                  isActive
                    ? {
                        background: "#CCFF00",
                        boxShadow: "0 0 15px rgba(204,255,0,0.4)",
                      }
                    : allDone
                    ? {
                        background: "rgba(204,255,0,0.1)",
                        border: "1px solid rgba(204,255,0,0.3)",
                      }
                    : {
                        background: "rgba(39,39,42,0.6)",
                        border: "1px solid rgba(63,63,70,0.4)",
                      }
                }
              >
                <span
                  className="text-xs font-bold"
                  style={{ color: isActive ? "#09090b" : allDone ? "#CCFF00" : "#71717a" }}
                >
                  {day}
                </span>
                {allDone && !isActive && (
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#CCFF00" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise list */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 pb-6">
        {currentExercises.map((exercise, index) => (
          <div
            key={exercise.id}
            id={`exercise-${exercise.id}`}
            className="rounded-2xl p-4 transition-all duration-300"
            style={{
              background: exercise.completed
                ? "rgba(204,255,0,0.06)"
                : "rgba(24,24,27,0.9)",
              border: exercise.completed
                ? "1px solid rgba(204,255,0,0.2)"
                : "1px solid rgba(39,39,42,0.8)",
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                id={`check-${exercise.id}`}
                checked={exercise.completed}
                onChange={() => toggleExercise(exercise.id)}
                className="neon-checkbox mt-0.5"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p
                      className="font-semibold text-sm leading-snug"
                      style={{
                        color: exercise.completed ? "#CCFF00" : "#f4f4f5",
                        textDecoration: exercise.completed
                          ? "line-through"
                          : "none",
                        opacity: exercise.completed ? 0.7 : 1,
                      }}
                    >
                      {exercise.name}
                    </p>
                    <span className="text-zinc-600 text-[11px] font-medium mt-0.5 block">
                      {exercise.muscle}
                    </span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 mt-2.5">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(39,39,42,0.6)" }}
                  >
                    <span className="text-zinc-500 text-[10px] font-medium">
                      SERIES
                    </span>
                    <span className="text-white text-xs font-bold">
                      {exercise.sets}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(39,39,42,0.6)" }}
                  >
                    <span className="text-zinc-500 text-[10px] font-medium">
                      REPS
                    </span>
                    <span className="text-white text-xs font-bold">
                      {exercise.reps}
                    </span>
                  </div>
                  {exercise.rest !== "-" && (
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(39,39,42,0.6)" }}
                    >
                      <Timer size={10} className="text-zinc-500" />
                      <span className="text-white text-xs font-bold">
                        {exercise.rest}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Completion message */}
        {progress === 100 && (
          <div
            className="rounded-2xl p-4 text-center"
            style={{
              background: "rgba(204,255,0,0.08)",
              border: "1px solid rgba(204,255,0,0.3)",
            }}
          >
            <p className="text-2xl mb-1">🎉</p>
            <p className="font-bold text-sm" style={{ color: "#CCFF00" }}>
              ¡Rutina completada!
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              Excelente trabajo. Descansa y repón energías.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

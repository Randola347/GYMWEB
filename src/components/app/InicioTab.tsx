"use client";

import {
  Bell,
  ChevronRight,
  Zap,
  CalendarDays,
  Megaphone,
  Dumbbell,
  CheckCircle2,
} from "lucide-react";
import type { TabType, UserData } from "@/app/page";

interface InicioTabProps {
  user: UserData;
  onNavigate: (tab: TabType) => void;
}

const todayExercises = [
  { name: "Press de Banca", sets: "4 × 10 reps" },
  { name: "Sentadilla", sets: "3 × 12 reps" },
  { name: "Peso Muerto", sets: "3 × 8 reps" },
];

export default function InicioTab({ user, onNavigate }: InicioTabProps) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Buenos días"
      : currentHour < 19
      ? "Buenas tardes"
      : "Buenas noches";

  return (
    <div className="px-5 pt-safe pb-6 space-y-5 animate-fade-up">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm font-medium">{greeting} 👋</p>
          <h2 className="text-2xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
            ¡Hola, {user.name}!
          </h2>
        </div>
        <button
          id="inicio-notification-btn"
          className="w-11 h-11 rounded-2xl flex items-center justify-center relative transition-all active:scale-90"
          style={{
            background: "rgba(39,39,42,0.8)",
            border: "1px solid rgba(63,63,70,0.5)",
          }}
          aria-label="Notificaciones"
        >
          <Bell size={20} className="text-zinc-300" />
          <span
            className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full"
            style={{ background: "#CCFF00" }}
          />
        </button>
      </div>





      {/* Announcement Card */}
      <div
        id="announcement-card"
        className="rounded-2xl p-4 overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.08))",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(59,130,246,0.15)" }}
          >
            <Megaphone size={18} className="text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                Novedad
              </span>
            </div>
            <p className="text-white font-semibold text-sm leading-snug">
              🏋️ Nuevas máquinas de cardio disponibles
            </p>
            <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
              Zona cardio renovada con 8 nuevas cintas y bicicletas elípticas de última generación. ¡Ven a probarlas!
            </p>
          </div>
        </div>
      </div>

      {/* Today's Routine Summary */}
      <div
        id="today-routine-card"
        className="rounded-2xl p-4"
        style={{
          background: "rgba(24,24,27,0.9)",
          border: "1px solid rgba(39,39,42,0.8)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Dumbbell size={16} style={{ color: "#CCFF00" }} />
            <span className="text-white font-semibold text-sm">Rutina de Hoy</span>
          </div>
          <button
            onClick={() => onNavigate("rutinas")}
            className="text-xs font-semibold transition-colors"
            style={{ color: "#CCFF00" }}
          >
            Ver todo →
          </button>
        </div>

        <div className="space-y-2.5">
          {todayExercises.map((ex, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-zinc-700 flex-shrink-0" />
              <div className="flex-1 flex items-center justify-between">
                <span className="text-zinc-300 text-sm font-medium">{ex.name}</span>
                <span className="text-zinc-500 text-xs">{ex.sets}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-4 pt-3 flex items-center gap-2"
          style={{ borderTop: "1px solid rgba(39,39,42,0.8)" }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#CCFF00" }}
          />
          <span className="text-zinc-500 text-xs">
            Día A — Pecho, Piernas & Espalda
          </span>
        </div>
      </div>
    </div>
  );
}

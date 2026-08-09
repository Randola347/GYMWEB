"use client";

import { Home, Dumbbell, User } from "lucide-react";
import type { TabType } from "@/app/page";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "inicio" as TabType, label: "Inicio", icon: Home },
  { id: "rutinas" as TabType, label: "Rutinas", icon: Dumbbell },
  { id: "perfil" as TabType, label: "Perfil", icon: User },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="flex-shrink-0 flex items-center justify-around px-2 pb-safe"
      style={{
        background: "rgba(9,9,11,0.95)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(39,39,42,0.8)",
        paddingTop: "10px",
        paddingBottom: "max(10px, env(safe-area-inset-bottom))",
        minHeight: "72px",
      }}
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            id={`nav-${id}`}
            onClick={() => onTabChange(id)}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all duration-200 active:scale-90 min-w-[60px]"
            style={
              isActive
                ? {
                    background: "rgba(204,255,0,0.1)",
                  }
                : {}
            }
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.8}
              style={{
                color: isActive ? "#CCFF00" : "#52525b",
                filter: isActive ? "drop-shadow(0 0 6px rgba(204,255,0,0.6))" : "none",
                transition: "all 0.2s ease",
              }}
            />
            <span
              className="text-[10px] font-semibold transition-all duration-200"
              style={{
                color: isActive ? "#CCFF00" : "#52525b",
                letterSpacing: "0.02em",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

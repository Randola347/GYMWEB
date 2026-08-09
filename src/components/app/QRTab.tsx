"use client";

import { Shield, RefreshCw } from "lucide-react";
import type { UserData } from "@/app/page";
import { useState } from "react";

interface QRTabProps {
  user: UserData;
}

function QRCodeSVG({ value }: { value: string }) {
  // Deterministic QR-like pattern based on value string
  const seed = value.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const size = 21;

  const cells: boolean[][] = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      // Finder patterns (top-left, top-right, bottom-left)
      const inTopLeft =
        (row < 7 && col < 7) &&
        ((row === 0 || row === 6 || col === 0 || col === 6) ||
          (row >= 2 && row <= 4 && col >= 2 && col <= 4));
      const inTopRight =
        (row < 7 && col >= size - 7) &&
        ((row === 0 || row === 6 || col === size - 7 || col === size - 1) ||
          (row >= 2 && row <= 4 && col >= size - 5 && col <= size - 3));
      const inBottomLeft =
        (row >= size - 7 && col < 7) &&
        ((row === size - 7 || row === size - 1 || col === 0 || col === 6) ||
          (row >= size - 5 && row <= size - 3 && col >= 2 && col <= 4));

      if (inTopLeft || inTopRight || inBottomLeft) return true;

      // Timing patterns
      if ((row === 6 || col === 6) && row >= 7 && col >= 7 && row < size - 7 && col < size - 7) {
        return (row + col) % 2 === 0;
      }

      // Pseudo-random data modules
      const hash = ((seed ^ (row * 17 + col * 31)) * 1664525 + 1013904223) >>> 0;
      return (hash >> 16) % 3 !== 0;
    })
  );

  const moduleSize = 8;
  const svgSize = size * moduleSize;

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Código QR del socio"
    >
      <rect width={svgSize} height={svgSize} fill="white" rx="4" />
      {cells.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * moduleSize}
              y={r * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill="#09090b"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default function QRTab({ user }: QRTabProps) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const qrValue = `GYMPRO-${user.memberId}-${user.plan.replace(/\s/g, "_")}`;

  return (
    <div className="px-5 pt-14 pb-6 flex flex-col items-center animate-fade-up">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-xl font-black text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            Mi Código QR
          </h2>
          <p className="text-zinc-500 text-xs mt-0.5">
            Presenta este código en recepción
          </p>
        </div>
        <button
          id="qr-refresh-btn"
          onClick={handleRefresh}
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "rgba(39,39,42,0.8)",
            border: "1px solid rgba(63,63,70,0.5)",
          }}
          aria-label="Actualizar QR"
        >
          <RefreshCw
            size={16}
            className="text-zinc-400 transition-transform"
            style={{
              transform: refreshing ? "rotate(360deg)" : "rotate(0deg)",
              transition: "transform 1s ease",
            }}
          />
        </button>
      </div>

      {/* Status Badge */}
      <div
        id="qr-status-badge"
        className="flex items-center gap-2 px-4 py-2 rounded-full mb-6"
        style={{
          background: "rgba(204,255,0,0.1)",
          border: "1px solid rgba(204,255,0,0.3)",
        }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#CCFF00" }}
        />
        <Shield size={14} style={{ color: "#CCFF00" }} />
        <span className="text-sm font-bold" style={{ color: "#CCFF00" }}>
          Acceso Permitido
        </span>
      </div>

      {/* QR Card */}
      <div
        id="qr-card"
        className="relative w-full max-w-[280px] rounded-3xl p-6 flex flex-col items-center"
        style={{
          background: "rgba(24,24,27,0.95)",
          border: "1px solid rgba(63,63,70,0.6)",
          boxShadow: "0 0 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Corner accents */}
        {[
          "top-3 left-3 border-t-2 border-l-2",
          "top-3 right-3 border-t-2 border-r-2",
          "bottom-3 left-3 border-b-2 border-l-2",
          "bottom-3 right-3 border-b-2 border-r-2",
        ].map((classes, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 ${classes} rounded-sm`}
            style={{ borderColor: "#CCFF00" }}
          />
        ))}

        {/* QR Code */}
        <div className="relative overflow-hidden rounded-xl">
          {!refreshing ? (
            <QRCodeSVG value={qrValue} />
          ) : (
            <div
              className="w-[168px] h-[168px] rounded-xl flex items-center justify-center"
              style={{ background: "rgba(39,39,42,0.5)" }}
            >
              <div
                className="w-8 h-8 rounded-full border-2 animate-spin"
                style={{
                  borderColor: "rgba(204,255,0,0.2)",
                  borderTopColor: "#CCFF00",
                }}
              />
            </div>
          )}

          {/* Scan line */}
          {!refreshing && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="qr-scan-line" />
            </div>
          )}
        </div>

        {/* Gym brand on QR card */}
        <div className="flex items-center gap-2 mt-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-zinc-600 text-xs font-bold tracking-widest">
            GYM<span style={{ color: "#CCFF00" }}>PRO</span>
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
      </div>

      {/* Member info */}
      <div className="mt-6 w-full space-y-2.5">
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(24,24,27,0.9)",
            border: "1px solid rgba(39,39,42,0.6)",
          }}
        >
          <span className="text-zinc-500 text-sm">Socio</span>
          <span className="text-white font-semibold text-sm font-mono">
            {user.memberId}
          </span>
        </div>
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(24,24,27,0.9)",
            border: "1px solid rgba(39,39,42,0.6)",
          }}
        >
          <span className="text-zinc-500 text-sm">Plan</span>
          <span className="text-sm font-bold" style={{ color: "#CCFF00" }}>
            {user.plan}
          </span>
        </div>
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(24,24,27,0.9)",
            border: "1px solid rgba(39,39,42,0.6)",
          }}
        >
          <span className="text-zinc-500 text-sm">Válido hasta</span>
          <span className="text-white font-medium text-sm">{user.planExpiry}</span>
        </div>
      </div>

      <p className="text-zinc-700 text-xs text-center mt-6 px-4 leading-relaxed">
        Este código es personal e intransferible. Se renueva automáticamente cada vez que inicias sesión.
      </p>
    </div>
  );
}

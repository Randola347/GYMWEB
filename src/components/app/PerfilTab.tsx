"use client";

import { useState } from "react";
import {
  LogOut,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
  Settings,
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Wifi,
  CreditCard,
  AlertCircle,
  Save,
  CheckCircle2,
} from "lucide-react";
import type { UserData } from "@/app/page";

interface PerfilTabProps {
  user: UserData;
  onLogout: () => void;
  onUpdateUser: (updates: Partial<UserData>) => void;
}

const faqs = [
  {
    icon: Clock,
    question: "¿Cuáles son los horarios del gimnasio?",
    answer:
      "Lunes a Viernes: 5:00 am – 11:00 pm\nSábados: 6:00 am – 10:00 pm\nDomingos y festivos: 7:00 am – 8:00 pm",
  },
  {
    icon: CreditCard,
    question: "¿Cómo renuevo mi membresía?",
    answer:
      "Puedes renovar directamente en recepción, por transferencia bancaria o enviando un mensaje por WhatsApp. Tu membresía se activa al instante al confirmar el pago.",
  },
  {
    icon: MapPin,
    question: "¿Dónde está ubicado el gimnasio?",
    answer:
      "Estamos en Av. Principal #123, Col. Centro. A 2 cuadras del metro. Contamos con estacionamiento gratuito para socios.",
  },
  {
    icon: Wifi,
    question: "¿Tienen WiFi para socios?",
    answer:
      "Sí, ofrecemos WiFi de alta velocidad en todas las áreas del gimnasio. La contraseña se entrega en recepción al presentar tu credencial de socio.",
  },
  {
    icon: AlertCircle,
    question: "¿Qué pasa si olvido mi acceso o código?",
    answer:
      "No hay problema. Acércate a recepción con tu identificación oficial y el equipo te ayudará a recuperar tu acceso en el momento.",
  },
  {
    icon: MessageCircle,
    question: "¿Puedo congelar mi membresía?",
    answer:
      "Sí, los planes VIP permiten congelar hasta 15 días por ciclo. Solicítalo con 48 horas de anticipación en recepción o por WhatsApp.",
  },
];

function AvatarPlaceholder({ initials }: { initials: string }) {
  return (
    <div
      className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-black relative overflow-hidden flex-shrink-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(204,255,0,0.2) 0%, rgba(204,255,0,0.05) 100%)",
        border: "2px solid rgba(204,255,0,0.3)",
        color: "#CCFF00",
        boxShadow: "0 0 30px rgba(204,255,0,0.15)",
      }}
      aria-label={`Avatar de ${initials}`}
    >
      <div
        className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-20"
        style={{ background: "#CCFF00" }}
      />
      <span className="relative z-10">{initials}</span>
    </div>
  );
}

function SettingsModal({
  user,
  onClose,
  onUpdateUser,
}: {
  user: UserData;
  onClose: () => void;
  onUpdateUser: (updates: Partial<UserData>) => void;
}) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = () => {
    // Update user info
    onUpdateUser({ name, phone });

    // Simulate password change notification if fields are filled
    if (currentPassword && newPassword) {
      setSuccessMsg("¡Datos actualizados! Se ha enviado un correo de confirmación de cambio de contraseña.");
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 3000);
    } else {
      setSuccessMsg("¡Datos guardados correctamente!");
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 2000);
    }
  };

  return (
    <>
      <div
        className="absolute inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl flex flex-col animate-fade-up"
        style={{
          background: "#111113",
          borderTop: "1px solid rgba(63,63,70,0.5)",
          maxHeight: "90%",
        }}
      >
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-zinc-700" />
        </div>
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(39,39,42,0.6)" }}
        >
          <h3 className="text-lg font-black text-white" style={{ letterSpacing: "-0.02em" }}>
            Configuración
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "rgba(39,39,42,0.8)",
              border: "1px solid rgba(63,63,70,0.5)",
            }}
          >
            <X size={16} className="text-zinc-400" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-6">
          {successMsg && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium animate-fade-up">
              <CheckCircle2 size={18} />
              {successMsg}
            </div>
          )}

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Datos Personales</h4>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">Nombre</label>
              <input
                type="text"
                className="gym-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">Teléfono</label>
              <input
                type="tel"
                className="gym-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Seguridad</h4>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">Contraseña Actual</label>
              <input
                type="password"
                className="gym-input"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">Nueva Contraseña</label>
              <input
                type="password"
                className="gym-input"
                placeholder="Mínimo 8 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSave} className="btn-neon flex items-center justify-center gap-2 mt-4">
            <Save size={18} /> Guardar Cambios
          </button>
        </div>
      </div>
    </>
  );
}

function HelpModal({ onClose }: { onClose: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <div
        className="absolute inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden flex flex-col"
        style={{
          background: "#111113",
          border: "1px solid rgba(63,63,70,0.5)",
          borderBottom: "none",
          maxHeight: "82%",
        }}
      >
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-zinc-700" />
        </div>
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(39,39,42,0.6)" }}
        >
          <div>
            <h3 className="text-lg font-black text-white" style={{ letterSpacing: "-0.02em" }}>Ayuda & Soporte</h3>
            <p className="text-zinc-500 text-xs mt-0.5">Preguntas frecuentes</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "rgba(39,39,42,0.8)",
              border: "1px solid rgba(63,63,70,0.5)",
            }}
          >
            <X size={16} className="text-zinc-400" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-2.5 pb-8">
          {faqs.map(({ icon: Icon, question, answer }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? "rgba(204,255,0,0.06)" : "rgba(24,24,27,0.9)",
                  border: isOpen ? "1px solid rgba(204,255,0,0.2)" : "1px solid rgba(39,39,42,0.6)",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen ? "rgba(204,255,0,0.15)" : "rgba(39,39,42,0.8)",
                    }}
                  >
                    <Icon size={16} style={{ color: isOpen ? "#CCFF00" : "#71717a" }} />
                  </div>
                  <span
                    className="flex-1 text-sm font-semibold leading-snug"
                    style={{ color: isOpen ? "#f4f4f5" : "#a1a1aa" }}
                  >
                    {question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={16} style={{ color: "#CCFF00", flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={16} className="text-zinc-600 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4" style={{ paddingLeft: "calc(1rem + 36px + 12px)" }}>
                    <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
          <a
            href="https://wa.me/525500000000?text=Hola,%20necesito%20ayuda%20con%20mi%20cuenta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-200 active:scale-95 w-full mt-2"
            style={{
              background: "linear-gradient(135deg, rgba(37,211,102,0.12), rgba(37,211,102,0.04))",
              border: "1px solid rgba(37,211,102,0.25)",
            }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(37,211,102,0.15)" }}>
              <MessageCircle size={16} style={{ color: "#25D366" }} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-semibold text-sm">¿No encontraste tu respuesta?</p>
              <p className="text-zinc-500 text-xs mt-0.5">Escríbenos por WhatsApp</p>
            </div>
            <ChevronRight size={16} className="text-zinc-600" />
          </a>
        </div>
      </div>
    </>
  );
}

export default function PerfilTab({ user, onLogout, onUpdateUser }: PerfilTabProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="px-5 pt-14 pb-6 space-y-5 animate-fade-up relative min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
          Mi Perfil
        </h2>
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "rgba(39,39,42,0.8)",
            border: "1px solid rgba(63,63,70,0.5)",
          }}
          aria-label="Configuración"
        >
          <Settings size={18} className="text-zinc-400" />
        </button>
      </div>

      <div
        className="rounded-3xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1d 0%, #111113 100%)",
          border: "1px solid rgba(63,63,70,0.5)",
        }}
      >
        <div
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: "#CCFF00" }}
        />
        <div className="relative z-10 flex items-center gap-4">
          <AvatarPlaceholder initials={user.avatarInitials} />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-black text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {user.name}
            </h3>
            <p className="text-zinc-500 text-xs truncate mt-0.5">{user.email}</p>
            <div className="mt-2">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-lg"
                style={{
                  background: "rgba(39,39,42,0.8)",
                  color: "#71717a",
                }}
              >
                #{user.memberId}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { icon: Mail, label: "Correo", value: user.email },
          { icon: Phone, label: "Teléfono", value: user.phone },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{
              background: "rgba(24,24,27,0.9)",
              border: "1px solid rgba(39,39,42,0.6)",
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(39,39,42,0.8)" }}
            >
              <Icon size={16} className="text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-wider">{label}</p>
              <p className="text-zinc-200 text-sm font-medium truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowHelp(true)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-200 active:scale-95 mt-4"
        style={{
          background: "rgba(24,24,27,0.9)",
          border: "1px solid rgba(39,39,42,0.6)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(39,39,42,0.8)" }}
          >
            <HelpCircle size={18} className="text-zinc-400" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-sm">Ayuda & Soporte</p>
            <p className="text-zinc-500 text-xs">Preguntas frecuentes</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-zinc-600" />
      </button>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95"
        style={{
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.2)",
          color: "#f87171",
        }}
      >
        <LogOut size={18} />
        Cerrar Sesión
      </button>

      <p className="text-center text-zinc-700 text-xs pb-2">
        GYM<span style={{ color: "rgba(204,255,0,0.5)" }}>PRO</span> v1.0.0 — Todos los derechos reservados
      </p>

      {showHelp && (
        <div className="fixed inset-0 z-40 overflow-hidden md:absolute md:w-[390px] md:h-[844px]">
          <HelpModal onClose={() => setShowHelp(false)} />
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-40 overflow-hidden md:absolute md:w-[390px] md:h-[844px]">
          <SettingsModal user={user} onClose={() => setShowSettings(false)} onUpdateUser={onUpdateUser} />
        </div>
      )}
    </div>
  );
}

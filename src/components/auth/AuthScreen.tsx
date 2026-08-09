"use client";

import { useState } from "react";
import { Eye, EyeOff, Dumbbell, Phone } from "lucide-react";
import type { AuthViewType } from "@/app/page";

interface AuthScreenProps {
  authView: AuthViewType;
  setAuthView: (view: AuthViewType) => void;
  onLogin: () => void;
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function AuthScreen({
  authView,
  setAuthView,
  onLogin,
}: AuthScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setForgotSuccess("Se ha enviado un correo con instrucciones para restablecer tu contraseña.");
      setTimeout(() => {
        setForgotSuccess("");
        setIsForgotPassword(false);
        setForgotEmail("");
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-zinc-950">
      {/* Hero Header */}
      <div className="relative flex flex-col items-center justify-center pt-safe pb-8 px-6">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "#CCFF00" }}
        />

        {/* Logo */}
        <div
          className="relative z-10 w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(204,255,0,0.15), rgba(204,255,0,0.05))",
            border: "1px solid rgba(204,255,0,0.3)",
            boxShadow: "0 0 30px rgba(204,255,0,0.2)",
          }}
        >
          <Dumbbell size={36} style={{ color: "#CCFF00" }} />
        </div>

        <h1
          className="relative z-10 text-3xl font-black tracking-tight text-white"
          style={{ letterSpacing: "-0.03em" }}
        >
          GYM<span style={{ color: "#CCFF00" }}>PRO</span>
        </h1>
        <p className="relative z-10 text-zinc-400 text-sm mt-1 font-medium">
          Tu entrenamiento, tu estilo de vida
        </p>
      </div>

      {/* Tab Switcher (hide if forgot password) */}
      {!isForgotPassword && (
        <div className="px-6 mb-6">
          <div className="flex bg-zinc-900 rounded-2xl p-1.5 gap-1">
            <button
              id="tab-login"
              onClick={() => setAuthView("login")}
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={
                authView === "login"
                  ? {
                      background: "#CCFF00",
                      color: "#09090b",
                      boxShadow: "0 0 15px rgba(204,255,0,0.4)",
                    }
                  : { color: "#71717a" }
              }
            >
              Iniciar Sesión
            </button>
            <button
              id="tab-register"
              onClick={() => setAuthView("register")}
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={
                authView === "register"
                  ? {
                      background: "#CCFF00",
                      color: "#09090b",
                      boxShadow: "0 0 15px rgba(204,255,0,0.4)",
                    }
                  : { color: "#71717a" }
              }
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      )}

      {/* Form Area */}
      <div className="px-6 flex-1">
        {/* Google Button */}
        {!isForgotPassword && (
          <>
            <button
              id="btn-google"
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-sm text-white transition-all duration-200 active:scale-95 mb-5"
              style={{
                background: "rgba(39,39,42,0.9)",
                border: "1px solid rgba(63,63,70,0.8)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(204,255,0,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(63,63,70,0.8)")
              }
            >
              <GoogleIcon />
              Continuar con Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-zinc-500 text-xs font-medium">o continúa con correo</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>
          </>
        )}

        {/* LOGIN FORM */}
        {!isForgotPassword && authView === "login" && (
          <div className="space-y-3 animate-fade-up">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="tucorreo@email.com"
                className="gym-input"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="gym-input pr-12"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              id="btn-login"
              onClick={onLogin}
              className="btn-neon mt-2"
            >
              Iniciar Sesión
            </button>
          </div>
        )}

        {/* REGISTER FORM */}
        {!isForgotPassword && authView === "register" && (
          <div className="space-y-3 animate-fade-up">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">
                Nombre completo
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="Carlos García"
                className="gym-input"
                value={registerForm.name}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">
                Teléfono
              </label>
              <div className="relative">
                <input
                  id="register-phone"
                  type="tel"
                  placeholder="+52 55 0000 0000"
                  className="gym-input pl-11"
                  value={registerForm.phone}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, phone: e.target.value })
                  }
                />
                <Phone
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">
                Correo electrónico
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="tucorreo@email.com"
                className="gym-input"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="gym-input pr-12"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              id="btn-register"
              onClick={onLogin}
              className="btn-neon mt-2"
            >
              Registrarme
            </button>
          </div>
        )}

        {/* FORGOT PASSWORD FORM */}
        {isForgotPassword && (
          <form onSubmit={handleForgotSubmit} className="space-y-4 animate-fade-up">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-2">Recuperar contraseña</h2>
              <p className="text-sm text-zinc-400">Ingresa tu correo y te enviaremos las instrucciones.</p>
            </div>
            
            {forgotSuccess && (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium text-center">
                {forgotSuccess}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2 ml-1">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                placeholder="tucorreo@email.com"
                className="gym-input"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-neon">
              Enviar enlace
            </button>
          </form>
        )}

        {/* Footer note */}
        <div className="mt-6 pb-8 text-center">
          {!isForgotPassword ? (
            <button
              onClick={() => setIsForgotPassword(true)}
              className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?{" "}
              <span style={{ color: "#CCFF00" }}>
                Restablécela aquí
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsForgotPassword(false)}
              className="text-zinc-500 text-xs hover:text-zinc-300 transition-colors"
            >
              ¿Ya la recordaste?{" "}
              <span style={{ color: "#CCFF00" }}>
                Volver al inicio de sesión
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

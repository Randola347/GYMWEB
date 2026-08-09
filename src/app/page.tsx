"use client";

import { useState } from "react";
import AuthScreen from "@/components/auth/AuthScreen";
import BottomNav from "@/components/app/BottomNav";
import InicioTab from "@/components/app/InicioTab";
import RutinasTab from "@/components/app/RutinasTab";

import PerfilTab from "@/components/app/PerfilTab";

export type TabType = "inicio" | "rutinas" | "perfil";
export type AuthViewType = "login" | "register";

export interface UserData {
  name: string;
  email: string;
  phone: string;
  memberId: string;
  avatarInitials: string;
}

const defaultUser: UserData = {
  name: "Carlos",
  email: "carlos@example.com",
  phone: "+52 55 1234 5678",
  memberId: "GYM-00421",
  avatarInitials: "CA",
};

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<AuthViewType>("login");
  const [activeTab, setActiveTab] = useState<TabType>("inicio");
  const [user, setUser] = useState<UserData>(defaultUser);

  const updateUser = (updates: Partial<UserData>) => {
    setUser({ ...user, ...updates });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab("inicio");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthView("login");
    setActiveTab("inicio");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      {/* Phone simulator frame on desktop */}
      <div className="phone-frame w-full md:w-[390px] h-screen md:h-[844px] bg-zinc-950 relative overflow-hidden md:rounded-[44px] md:shadow-2xl md:border md:border-zinc-800 flex flex-col">
        {!isLoggedIn ? (
          <AuthScreen
            authView={authView}
            setAuthView={setAuthView}
            onLogin={handleLogin}
          />
        ) : (
          <div className="flex flex-col h-full">
            {/* Main content area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {activeTab === "inicio" && (
                <InicioTab user={user} onNavigate={setActiveTab} />
              )}
              {activeTab === "rutinas" && <RutinasTab />}

              {activeTab === "perfil" && (
                <PerfilTab user={user} onLogout={handleLogout} onUpdateUser={updateUser} />
              )}
            </div>

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}
      </div>
    </div>
  );
}
